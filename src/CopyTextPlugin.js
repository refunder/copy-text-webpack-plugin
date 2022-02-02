class CopyBetweenPlugin {
    constructor(options) {
        if (typeof options == "undefined") {
            throw new Error("A config object must be provided");
        }

        if (typeof options.pattern == 'undefined') {
            throw new Error("A pattern must be provided");
        }

        this.strings = [];
        this.pattern = options.pattern;
        this.extension = options.extension || "js";
        this.allowDoubleEntries = options.allowDoubleEntries || false;
        this.captureGroupNumber = options.captureGroupNumber || 1;
        this.outputFilename = (options.outputFilename || "strings") + ".json";
    }

    findStringsInAssets() {
        this.compilation.chunks.forEach((chunk) => {
            chunk.files.forEach((filename) => {
                this.addToStrings(filename)
            });
        });
    }

    removeDoubleEntries(array) {
        return [...new Set(array)];
    }

    addToStrings(filename) {
        var source = this.compilation.assets[filename].source();

        if (filename.split('.').pop() == this.extension) {
            let match;

            while ((match = this.pattern.exec(source)) !== null) {
                this.strings.push(match[this.captureGroupNumber]);
            }
        }
    }

    addStringsToAssets() {
        this.compilation.assets[this.outputFilename] = {
            source: () => {
                return JSON.stringify(this.strings);
            },

            size: () => {
                return JSON.stringify(this.strings).length;
            }
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tap('copyTextPlugin', (compilation) => {
            this.compilation = compilation;
            this.findStringsInAssets();
            this.strings = this.allowDoubleEntries
                ? this.strings
                : this.removeDoubleEntries(this.strings);
            this.addStringsToAssets();
        });
    }
}

module.exports = CopyBetweenPlugin;
