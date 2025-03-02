const parseEpubMetadata = require('./parseEpubMetadata')

/**
 * @typedef EBookFileScanData
 * @property {string} path
 * @property {string} ebookFormat
 * @property {string} ebookCoverPath internal image path
 * @property {import('../../scanner/BookScanner').BookMetadataObject} metadata
 */

/**
 * Parse metadata from ebook file
 * 
 * @param {import('../../models/Book').EBookFileObject} ebookFile 
 * @returns {Promise<EBookFileScanData>}
 */
async function parse(ebookFile) {
  if (!ebookFile) return null

  if (ebookFile.ebookFormat === 'epub') {
    return parseEpubMetadata.parse(ebookFile.metadata.path)
  }
  return null
}
module.exports.parse = parse

/**
 * Extract cover from ebook file
 * 
 * @param {EBookFileScanData} ebookFileScanData 
 * @param {string} outputCoverPath 
 * @returns {Promise<boolean>}
 */
async function extractCoverImage(ebookFileScanData, outputCoverPath) {
  if (!ebookFileScanData?.ebookCoverPath) return false

  if (ebookFileScanData.ebookFormat === 'epub') {
    return parseEpubMetadata.extractCoverImage(ebookFileScanData.path, ebookFileScanData.ebookCoverPath, outputCoverPath)
  }
  return false
}
module.exports.extractCoverImage = extractCoverImage