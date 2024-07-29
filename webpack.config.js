module.exports = {
    // ... other configurations ...
    plugins: [new webpack.IgnorePlugin(/canvas|jsdom/, /konva/)],
};
