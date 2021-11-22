"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreDigipet = exports.walkDigipet = exports.trainDigipet = exports.rehomeDigipet = exports.hatchDigipet = exports.feedDigipet = void 0;
const model_1 = require("./model");
/**
 * The actions that your Digipet game supports.
 *
 * These update the underlying digipet by using the functions defined in model.ts
 */
function feedDigipet() {
    model_1.updateDigipetBounded("nutrition", 10);
    model_1.updateDigipetBounded("discipline", -5);
}
exports.feedDigipet = feedDigipet;
function hatchDigipet() {
    if (model_1.getDigipet()) {
        throw new Error("Can't hatch a digipet when you already have one!");
    }
    else {
        // spread to avoid accidental mutation
        const newDigipet = Object.assign({}, model_1.INITIAL_DIGIPET);
        model_1.setDigipet(newDigipet);
        return newDigipet;
    }
}
exports.hatchDigipet = hatchDigipet;
function rehomeDigipet() {
    if (model_1.getDigipet()) {
        const newDigipet = undefined;
        return model_1.setDigipet(newDigipet);
    }
    else {
        throw new Error("can't rehome a digipet when you don't have one!");
    }
}
exports.rehomeDigipet = rehomeDigipet;
function trainDigipet() {
    model_1.updateDigipetBounded("happiness", -5);
    model_1.updateDigipetBounded("discipline", 10);
}
exports.trainDigipet = trainDigipet;
function walkDigipet() {
    model_1.updateDigipetBounded("happiness", 10);
    model_1.updateDigipetBounded("nutrition", -5);
}
exports.walkDigipet = walkDigipet;
function ignoreDigipet() {
    model_1.updateDigipetBounded("happiness", -10);
    model_1.updateDigipetBounded("nutrition", -10);
    model_1.updateDigipetBounded("discipline", -10);
}
exports.ignoreDigipet = ignoreDigipet;
