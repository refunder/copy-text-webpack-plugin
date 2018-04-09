# Copy Text Webpack Plugin

_Copy text from compiled assets to a separate file_

## Usage

Use this plugin to copy certain values form your compiled assets. For example all html ids, imported files or whatever you like.

```js

plugins: [
    new CopyTextPlugin({
        pattern: , // Pattern to match, required
        extension: 'js', // File extension to copy from
        allowDoubleEntries: false, // Allow same values to be saved more then once
        captureGroupNumber: 1, // Which regex group to capture
        outputFilename, strings, // Name of the newly generated file
    }),
]

```

## TODO

* Improve readme file
* Create tests
