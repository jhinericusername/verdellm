import fs from 'fs/promises';
import path from 'path';
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT, // Securely access JWT from environment
});

/**
 * Fetch data from Pinata using a CID.
 * @param {string} cid - Content Identifier (CID) for the file on Pinata.
 * @returns {Promise<Buffer>} - The file data as a Buffer.
 */
export async function fetchDataFromPinata(cid) {
  try {
    const response = await pinata.gateways.get(cid);
    if (!response || !response.data) {
      throw new Error('No data returned from Pinata for the given CID');
    }
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error fetching data from Pinata:', error);
    throw error;
  }
}

/**
 * Save file data to the local file system.
 * @param {Buffer} fileData - File data to save.
 * @param {string} fileName - Name for the file.
 * @param {string} directory - Directory to save the file in.
 * @returns {string} - Full path to the saved file.
 */
export async function saveToFile(fileData, fileName, directory = './files') {
  try {
    const dirPath = path.resolve(directory);
    await fs.mkdir(dirPath, { recursive: true }); // Ensure directory exists
    const filePath = path.join(dirPath, fileName);
    await fs.writeFile(filePath, fileData);
    console.log(`File saved to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
}

/**
 * Upload file metadata to Pinata.
 * @param {string} filePath - Path to the file.
 * @param {string} name - Name for the metadata.
 * @param {Record<string, string>} metadata - Additional metadata key-value pairs.
 * @returns {Object} - Response from Pinata, including the CID.
 */
export async function uploadMetadataToPinata(filePath, name, metadata = {}) {
  try {
    const file = await fs.readFile(filePath);
    const fileBlob = new Blob([file], { type: 'application/octet-stream' });

    const response = await pinata.upload
      .file(fileBlob)
      .addMetadata({ name, keyvalues: metadata });

    console.log(`Metadata uploaded to Pinata: ${response.cid}`);
    return response;
  } catch (error) {
    console.error('Error uploading metadata to Pinata:', error);
    throw error;
  }
}

/**
 * Process and save data from Pinata to a file with metadata.
 * @param {string} cid - CID to fetch from Pinata.
 * @param {string} name - Name for the file and metadata.
 * @param {Record<string, string>} metadata - Additional metadata for the file.
 * @returns {Object} - Information including the local file path and Pinata CID.
 */
export async function processPinataData(cid, name, metadata = {}) {
  try {
    // Step 1: Fetch data from Pinata
    const fileData = await fetchDataFromPinata(cid);

    // Step 2: Save data locally
    const fileName = `${name}-${Date.now()}.bin`; // Unique file name
    const filePath = await saveToFile(fileData, fileName);

    // Step 3: Upload metadata back to Pinata
    const pinataResponse = await uploadMetadataToPinata(filePath, name, metadata);

    return {
      localPath: filePath,
      pinataCid: pinataResponse.cid,
    };
  } catch (error) {
    console.error('Error processing Pinata data:', error);
    throw error;
  }
}
