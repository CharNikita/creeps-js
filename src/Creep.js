[
    "attack",
    "attackController",
    "build",
    "claimController",
    "dismantle",
    "drop",
    "generateSafeMode",
    "harvest",
    "heal",
    "move",
    "moveByPath",
    "moveTo",
    "pickup",
    "rangedAttack",
    "rangedHeal",
    "rangedMassAttack",
    "repair",
    "reserveController",
    "signController",
    "suicide",
    "transfer",
    "upgradeController",
    "withdraw"
].forEach(function (method) {
    let original = Creep.prototype[method];
    Creep.prototype[method] = function () {
        let status = original.apply(this, arguments);
        if (typeof status === "number" && status < 0) {
            console.log(
                `${this.name} ${method} failed with ${status} at ${this.pos}`
            );
        }
        return status;
    };
});