import React, { Component } from 'react';
import createShallowRenderer from './helpers/createShallowRenderer';
import expect from 'expect';
import { createProxy, getForceUpdate } from '../src';

class Base1 {
  static getY() {
    return 42;
  }

  getX() {
    return 42;
  }

  render() {
    console.log('base1')
    return this.actuallyRender();
  }
}

class Base2 {
  static getY() {
    return 43;
  }

  getX() {
    return 43;
  }

  render() {
    console.log('base2')
    return this.actuallyRender();
  }
}

describe('inheritance', () => {
  const forceUpdate = getForceUpdate(React);

  let renderer;
  let warnSpy;

  beforeEach(() => {
    renderer = createShallowRenderer();
    warnSpy = expect.spyOn(console, 'warn').andCallThrough();
  });

  afterEach(() => {
    warnSpy.destroy();
    expect(warnSpy.calls.length).toBe(0);
  });

  describe('modern only', () => {
    it('replaces a base instance method with proxied base and derived', () => {
      const baseProxy = createProxy(Base1);
      const BaseProxy = baseProxy.get();
      class Derived extends BaseProxy {
        actuallyRender() {
          return <span>{super.getX() * 10}</span>;
        }
      }
      console.log(BaseProxy.prototype.getX)
      const derivedProxy = createProxy(Derived);
      const DerivedProxy = derivedProxy.get();
      const instance = renderer.render(<DerivedProxy />);
      expect(renderer.getRenderOutput().props.children).toEqual(420);

      const instances = baseProxy.update(Base2);
      instances.forEach(forceUpdate);
      // renderer.render(<DerivedProxy />)
      expect(renderer.getRenderOutput().props.children).toEqual(430);
    });

    // it('replaces a base static method with proxied base and derived', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Derived extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 10}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   baseProxy.update(Base2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(430);
    // });

    // it('replaces a base instance method with proxied base only', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Derived extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{super.getX() * 10}</span>;
    //     }
    //   }

    //   const instance = renderer.render(<Derived />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   baseProxy.update(Base2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(430);
    // });

    // it('replaces a base static method with proxied base only', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Derived extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 10}</span>;
    //     }
    //   }

    //   const instance = renderer.render(<Derived />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   baseProxy.update(Base2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(430);
    // });

    // it('replaces a derived instance method with proxied base and derived', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Derived1 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{super.getX() * 10}</span>;
    //     }
    //   }

    //   class Derived2 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{super.getX() * 100}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived1);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   derivedProxy.update(Derived2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(4200);
    // });

    // it('replaces a derived static method with proxied base and derived', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Derived1 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 10}</span>;
    //     }
    //   }

    //   class Derived2 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 100}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived1);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   derivedProxy.update(Derived2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(4200);
    // });

    // it('replaces a derived instance method with proxied derived only', () => {
    //   class Derived1 extends Base1 {
    //     actuallyRender() {
    //       return <span>{super.getX() * 10}</span>;
    //     }
    //   }

    //   class Derived2 extends Base1 {
    //     actuallyRender() {
    //       return <span>{super.getX() * 100}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived1);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   derivedProxy.update(Derived2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(4200);
    // });

    // it('replaces a derived static method with proxied derived only', () => {
    //   class Derived1 extends Base1 {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 10}</span>;
    //     }
    //   }

    //   class Derived2 extends Base1 {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 100}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived1);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual(420);

    //   derivedProxy.update(Derived2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual(4200);
    // });

    // it('replaces any instance method with proxied base, middle and derived', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Middle1 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{super.getX() * 10}</span>;
    //     }
    //   }

    //   class Middle2 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{super.getX() * 100}</span>;
    //     }
    //   }

    //   const middleProxy = createProxy(Middle1);
    //   const MiddleProxy = middleProxy.get();

    //   class Derived1 extends MiddleProxy {
    //     render() {
    //       return <span>{super.render().props.children + ' lol'}</span>;
    //     }
    //   }

    //   class Derived2 extends MiddleProxy {
    //     render() {
    //       return <span>{super.render().props.children + ' nice'}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived1);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual('420 lol');

    //   baseProxy.update(Base2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('430 lol');

    //   middleProxy.update(Middle2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('4300 lol');

    //   derivedProxy.update(Derived2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('4300 nice');

    //   derivedProxy.update(Derived1).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('4300 lol');

    //   middleProxy.update(Middle1).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('430 lol');

    //   baseProxy.update(Base1).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('420 lol');
    // });

    // it('replaces any static method with proxied base, middle and derived', () => {
    //   const baseProxy = createProxy(Base1);
    //   const BaseProxy = baseProxy.get();

    //   class Middle1 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 10}</span>;
    //     }
    //   }

    //   class Middle2 extends BaseProxy {
    //     actuallyRender() {
    //       return <span>{this.constructor.getY() * 100}</span>;
    //     }
    //   }

    //   const middleProxy = createProxy(Middle1);
    //   const MiddleProxy = middleProxy.get();

    //   class Derived1 extends MiddleProxy {
    //     render() {
    //       return <span>{super.render().props.children + ' lol'}</span>;
    //     }
    //   }

    //   class Derived2 extends MiddleProxy {
    //     render() {
    //       return <span>{super.render().props.children + ' nice'}</span>;
    //     }
    //   }

    //   const derivedProxy = createProxy(Derived1);
    //   const DerivedProxy = derivedProxy.get();

    //   const instance = renderer.render(<DerivedProxy />);
    //   expect(renderer.getRenderOutput().props.children).toEqual('420 lol');

    //   baseProxy.update(Base2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('430 lol');

    //   middleProxy.update(Middle2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('4300 lol');

    //   derivedProxy.update(Derived2).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('4300 nice');

    //   derivedProxy.update(Derived1).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('4300 lol');

    //   middleProxy.update(Middle1).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('430 lol');

    //   baseProxy.update(Base1).forEach(forceUpdate);
    //   expect(renderer.getRenderOutput().props.children).toEqual('420 lol');
    // });
  });
});
