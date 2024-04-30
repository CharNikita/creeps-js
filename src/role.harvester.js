const DIE = 'die';
const HARVEST = 'harvest';
const TRANSFER = 'transfer';

const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.ticksToLive <= 3) {
            creep.memory.state = DIE;
        } else if (creep.store.getFreeCapacity() > 0) {
            creep.memory.state = HARVEST;
        } else if (creep.store.getFreeCapacity() === 0) {
            creep.memory.state = TRANSFER;
        }

        if (creep.memory.state === HARVEST) {
            this._withdraw(creep);
        } else if (creep.memory.state === TRANSFER) {
            this._transfer(creep);
        } else if (creep.memory.state === DIE) {
            this._cleanUp(creep);
        }
    },
    /** @param {Creep} creep **/
    _transfer: function (creep) {
        this._cleanUp(creep);

        const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER);
            }
        });

        const transferResult = creep.transfer(targets, RESOURCE_ENERGY);
        if (transferResult === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                }
            );
        }
    },
    /** @param {Creep} creep **/
    _withdraw: (creep) => {
        let target = this._getTargetToWithdraw(creep);
        if (!target) {
            return;
        }

        const harvestResult = creep.harvest(target);
        if (harvestResult === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                }
            );
        }
    },
    /** @param {Creep} creep **/
    _getTargetToWithdraw: (creep) => {
        return creep.pos.findClosestByPath(FIND_SOURCES, {
            filter: function (source) {
                return Memory.sources[source.id].assignedCreepId == null;
            }
        });
    },
    /** @param {Creep} creep **/
    _cleanUp: (creep) => {
        const sourceId = creep.memory.sourceId;
        if (!sourceId) {
            return;
        }
        Memory.sources[sourceId].assignedCreepId = null;
        creep.memory.sourceId = null;
    }

};

module.exports = roleHarvester;