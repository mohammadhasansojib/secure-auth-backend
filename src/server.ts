import app from "./app.js";

async function main() {
    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Server running at port ${port}...`));
}

main();