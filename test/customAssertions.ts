import {BigNumber} from 'ethers';

declare global {
  export namespace Chai {
    interface Assertion {
      approx(other: BigNumber): void;
    }
  }
}

export const customMatchers = (chai: Chai.ChaiStatic) => {
  approx(chai.Assertion);
};

const approx = (Assertion: Chai.AssertionStatic) => {
  Assertion.addMethod('approx', function (this: any, other: BigNumber) {
    const thisString = this._obj.toString();
    const otherString = other.toString();
    this.assert(thisString.length === otherString.length,
      `Expected value ${thisString} to equal ${otherString}`);
    const thisShortened = thisString.substring(0, thisString.length - 1);
    const otherShortened = otherString.substring(0, otherString.length - 1);
    this.assert(thisShortened === otherShortened,
      `Expected value ${thisString} to equal ${otherString}`);
  });
};
