import { expect } from "chai";
import { Factorum } from "../../../src/cards/promo/Factorum";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Resources } from "../../../src/Resources";
import { Game } from '../../../src/Game';
import { OrOptions } from '../../../src/inputs/OrOptions';

describe("Factorum", function () {
    it("Should play", function () {
        const card = new Factorum();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const play = card.play(player);
        expect(play).to.eq(undefined);
        expect(player.getProduction(Resources.STEEL)).to.eq(1);
        player.megaCredits = 10;

        player.corporationCard = card;

        const action = card.action(player, game);
        expect(action instanceof OrOptions).to.eq(true);
        if ( ! (action instanceof OrOptions)) return;

        expect(action.options.length).to.eq(2);
        const orOptions = action.options[1] as OrOptions;

        orOptions.cb();
        expect(player.cardsInHand.length).to.eq(1);
        expect(player.megaCredits).to.eq(7);

        const orOptions2 = action.options[0] as OrOptions;
        orOptions2.cb();
        expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    });
});