module.exports = async (client) => {
    console.log("Ka-boom!");

    client.user.setActivity("!hi", { type: "WATCHING" });
};