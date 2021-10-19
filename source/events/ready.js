module.exports = async (client) => {
    console.log("Ka-boom!");

    client.user.setActivity("#KaJam2021", { type: "WATCHING" });
};