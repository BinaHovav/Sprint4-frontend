// Unsplash.js

import { createApi } from 'unsplash-js'
// import fetch from 'node-fetch'
// import fs from 'fs'

export class Unsplash {
  constructor(NEbdbIoyFeZkGTSSkDiiKOcvsH6YIXDo3vchwoRVh68) {
    // Create an instance of the Unsplash API using the provided access key
    this.unsplash = createApi({ NEbdbIoyFeZkGTSSkDiiKOcvsH6YIXDo3vchwoRVh68, fetch })
  }

  async getPhoto(type, query, page = 1, per_page = 8, orientation = 'landscape') {
    try {
      // Send a request to the Unsplash API to search for photos
      const response = await this.unsplash.search.getPhotos({
        query,
        // page,
        per_page,
        orientation,
      })

      // Check if the 'results' array is available in the response
      if (response && response.response && response.response.results && response.response.results.length > 0) {
        const aRandomPhoto = response.response.results[0]
        // Get the regular size photo url
        const photoUrl = aRandomPhoto.urls.regular
        return photoUrl
      } else {
        throw new Error('No photos found.')
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
