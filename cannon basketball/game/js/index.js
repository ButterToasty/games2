!(function (p) {
  function r(a, b, d) {
    this.onClick = new y();
    this.onDown = new y();
    this.onUp = new y();
    this.onOut = new y();
    b && ((b = b.bind(d || this)), this.onClick.add(b));
    this.isOver = this.isDown = this.disposed = !1;
    this.name = "TintButton";
    this.upTint = 16777215;
    this.overTint = 15658734;
    this.downTint = 14540253;
    this.disableTint = 8947848;
    this.tint = this.upTint;
    PIXI.Sprite.call(this, a);
    this.mousedown = this.touchstart = this._mouseDown;
    this.mouseup =
      this.touchend =
      this.mouseupoutside =
      this.touchendoutside =
        this._mouseUp;
    this.mouseover = this._mouseOver;
    this.mouseout = this._mouseOut;
    this.click = this.tap = this._clickTap;
    this.buttonMode = this.interactive = !0;
    this.anchor.set(0.5, 0.5);
    this._cacheAnchorY = null;
  }
  function m(a, b) {
    PIXI.Container.call(this);
    this.name = a || "Item";
    this.zOrder = b || q.zOrder.defaultZ;
    this._body = null;
    this.positionUpdate = this.angleUpdate = !1;
  }
  function M() {
    PIXI.Container.call(this);
    var a = new PIXI.TextStyle({
        fontFamily: "Impact",
        fontSize: 42,
        fill: "white",
        align: "center",
      }),
      b = new PIXI.Graphics();
    b.beginFill(0);
    b.drawRect(0, 0, c.gameWidth0, c.gameHeight0);
    b.endFill();
    this.addChild(b);
    this._txtLoading = new PIXI.Text("Loading", a);
    this._txtLoading.scale.set(0.5, 0.5);
    this._txtLoading.anchor.set(0.5, 0.5);
    this._txtLoading.x = c.gameWidth0 / 2;
    this._txtLoading.y = c.gameHeight0 / 2 - 10;
    this.addChild(this._txtLoading);
    c.pixi.ticker.add(this._update, this);
    this._curr = this._loaded = 0;
  }
  function Z() {
    PIXI.Container.call(this);
    var a = c.assets.getSprite("splash");
    a.anchor.set(0.5, 0.5);
    a.x = c.gameWidth0 / 2;
    a.y = c.gameHeight0 / 2;
    this.addChild(a);
  }
  function N(a) {
    this.app = a;
  }
  function C() {
    EventTarget.call(this);
    this._event = {};
    this._event.type = "";
    this._event.orientation = "";
    this._event.originalEvent = null;
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onWebkitVisibilityChange = this._onWebkitVisibilityChange.bind(this);
    this._onPageShow = this._onPageShow.bind(this);
    this._onPageHide = this._onPageHide.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onOrientationChange = this._onOrientationChange.bind(this);
    document.addEventListener("visibilitychange", this._onVisibilityChange, !1);
    document.addEventListener(
      "webkitvisibilitychange",
      this._onWebkitVisibilityChange,
      !1
    );
    document.addEventListener("pageshow", this._onPageHide, !1);
    document.addEventListener("pagehide", this._onPageShow, !1);
    p.onfocus = this._onFocus;
    p.onblur = this._onBlur;
    this.orientation = this._getOrientation();
    this._event.orientation = this.orientation;
    p.addEventListener("resize", this._onResize, !1);
    p.addEventListener("orientationchange", this._onOrientationChange, !1);
  }
  function z(a, b, d, e, g) {
    this.up = a;
    this.over = b;
    this.down = d;
    this.onClick = new y();
    this.onDown = new y();
    this.onUp = new y();
    this.onOut = new y();
    e && ((e = e.bind(g || this)), this.onClick.add(e));
    this.name = "Button";
    this.isOver = this.isDown = this.disposed = !1;
    PIXI.Sprite.call(this, a);
    this.mousedown = this.touchstart = this._mouseDown;
    this.mouseup =
      this.touchend =
      this.mouseupoutside =
      this.touchendoutside =
        this._mouseUp;
    this.mouseover = this._mouseOver;
    this.mouseout = this._mouseOut;
    this.click = this.tap = this._clickTap;
    this.interactive = !0;
    this.anchor.set(0.5, 0.5);
    this._cacheAnchorY = null;
  }
  function T(a, b, d) {
    var e = c.assets.getTexture("btnNumLevel", "atlasUI");
    r.call(this, e, b, d);
    this.num = a;
    this.name = "ButtonLevel" + a;
    b = new PIXI.TextStyle({
      fontFamily: "Impact",
      fontSize: 32,
      fill: "black",
      stroke: "white",
      strokeThickness: 3,
    });
    this.setLabel(a + "", b);
    this.scale.set(0.5, 0.5);
  }
  function U(a, b, d, e, g) {
    PIXI.Container.call(this);
    this._callback = e;
    this._callbackScope = g;
    this._on = r.generateButton(a, d, this._onClick, this);
    this._on.name = "ON";
    this.addChild(this._on);
    this._off = r.generateButton(b, d, this._onClick, this);
    this._off.name = "OFF";
    this.addChild(this._off);
    this.on = !0;
  }
  function D(a) {
    this.name = a || "Collection#" + ++D.__id;
    this._arr = [];
    this.throwIfOut = this.throwIfNotIn = this.throwIfIn = !1;
  }
  function G() {
    Box2D.Dynamics.b2ContactListener.call(this);
    this._ee = new EventEmitter();
    this._eventNameBeginContact = "onBeginContact";
    this._eventNameEndContact = "onEndContact";
  }
  function y() {
    this.count = 0;
    this._callbacks = [];
    this._doItAfter = [];
    this.disposed = this._blocked = !1;
  }
  function w(a) {
    this.stage = a;
    this.mouse = new PIXI.InteractionData();
    this.touchs = {};
    this.interactInvisible = !1;
    this.tempPoint = new PIXI.Point();
    this.mouseoverEnabled = !0;
    this.pool = [];
    this.interactiveItems = [];
    this.interactionDOMElement = null;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.last = 0;
  }
  function aa() {
    this.localStorageEnable = !1;
    this._storage = {};
    try {
      this.localStorageEnable = "localStorage" in p && null !== p.localStorage;
    } catch (a) {}
  }
  function k(a) {
    p.b2Vec2 = Box2D.Common.Math.b2Vec2;
    p.b2AABB = Box2D.Collision.b2AABB;
    p.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    p.b2Body = Box2D.Dynamics.b2Body;
    p.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    p.b2Fixture = Box2D.Dynamics.b2Fixture;
    p.b2World = Box2D.Dynamics.b2World;
    p.b2MassData = Box2D.Collision.Shapes.b2MassData;
    p.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    p.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    p.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    p.b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    this.world = new va(new V(0, 12), !0);
    this.contactListener = new G();
    this.world.SetContactListener(this.contactListener);
    c.physWorld = this.world;
    this.clearDoIt();
    this._context = this._canvas = null;
    a && this.enableDebugDraw();
    c.pixi.ticker.add(this._update, this);
  }
  function na(a) {
    "undefined" == typeof a && (a = []);
    this.c = 1;
    this.s2 = this.s1 = this.s0 = 0;
    this.sow(a);
  }
  function W() {
    this.shown = !1;
    PIXI.Container.call(this);
    var a = c.assets.getSprite("dialog");
    a.scale.set(0.5, 0.5);
    a.anchor.set(0.5, 0.5);
    this.addChild(a);
    this.showX = c.gameWidth0 - 30;
    this.showY = c.gameHeight0 - 20;
    this.hideX = c.gameWidth0 + this.width + 10;
    this.hideY = this.showY;
    this.x = this.hideX;
    this.y = this.hideY;
    a = new PIXI.TextStyle({
      fontFamily: "Impact",
      fontSize: 32,
      fill: "white",
      stroke: "black",
      strokeThickness: 2,
      align: "center",
      lineHeight: 42,
    });
    a = new PIXI.Text(
      "code & art :: OLEG KUZYK\nlevel design :: GEORGIY STEPANOV\nmusic :: Kevin MacLeod\nrender :: PIXI. JS\nphysics :: MATTER. JS\n",
      a
    );
    a.scale.set(0.5, 0.5);
    a.anchor.set(0.5, 0.45);
    this.addChild(a);
    this.pivot.set(this.width / 2, this.height / 2);
  }
  function X(a, b) {
    PIXI.Container.call(this);
    this._buttonsHandler = a;
    var d = c.assets.getSprite("levelCompleted");
    d.scale.set(0.5, 0.5);
    d.interactive = !0;
    this.addChild(d);
    wrapper = function (g, h, l) {
      a.call(this, g, h, l);
      setTimeout(cmgAdBreakCall, 500);
    };
    this._btnRestart = r.generateButton(
      "btnRestartComplete",
      "atlasUI",
      wrapper,
      b
    );
    this._btnRestart.name = "Restart";
    this._btnRestart.scale.set(0.5, 0.5);
    this._btnRestart.anchor.set(0.5, 0.5);
    this._btnRestart.x = this._btnRestart.xIn = c.gameWidth0 / 2;
    this._btnRestart.y = this._btnRestart.yIn = c.gameHeight0 / 2 + 100;
    this._btnRestart.xOut = this._btnRestart.xIn;
    this._btnRestart.yOut = c.gameHeight0 + this._btnRestart.height / 2 + 10;
    this.addChild(this._btnRestart);
    this._btnMenu = r.generateButton("btnMenuComplete", "atlasUI", wrapper, b);
    this._btnMenu.name = "Menu";
    this._btnMenu.scale.set(0.5, 0.5);
    this._btnMenu.anchor.set(0.5, 0.5);
    this._btnMenu.x = this._btnMenu.xIn =
      this._btnRestart.x -
      this._btnRestart.width / 2 -
      this._btnMenu.width / 2 -
      20;
    this._btnMenu.y = this._btnMenu.yIn = this._btnRestart.y;
    this._btnMenu.xOut = -this._btnMenu.width / 2 - 10;
    this._btnMenu.yOut = this._btnMenu.yIn;
    this.addChild(this._btnMenu);
    this._btnNext = r.generateButton("btnNextComplete", "atlasUI", wrapper, b);
    this._btnNext.name = "Next";
    this._btnNext.scale.set(0.5, 0.5);
    this._btnNext.anchor.set(0.5, 0.5);
    this._btnNext.x = this._btnNext.xIn =
      this._btnRestart.x +
      this._btnRestart.width / 2 +
      this._btnNext.width / 2 +
      20;
    this._btnNext.y = this._btnNext.yIn = this._btnRestart.y;
    this._btnNext.xOut = c.gameWidth0 + this._btnNext.width / 2 + 10;
    this._btnNext.yOut = this._btnNext.yIn;
    this.addChild(this._btnNext);
    d = new PIXI.TextStyle({
      fontFamily: "Impact",
      fontSize: 52,
      fill: "black",
      stroke: "white",
      strokeThickness: 3,
      align: "center",
    });
    var e = "LEVEL " + c.levelMng.currLevel + " COMPLETED!";
    c.levelMng.currLevel == c.levelMng.totalLevels &&
      ((e = "CONGRATULATIONS!\nYOU'VE PASSED THE GAME!"), (d.fontSize = 36));
    this._text = new PIXI.Text(e, d);
    this._text.anchor.set(0.5, 0.5);
    this._text.scale.set(0.5, 0.5);
    this._text.x = c.gameWidth0 / 2;
    this._text.y = c.gameHeight0 / 2 - 50;
    this.addChild(this._text);
    this.sndWin = c.assets.getSound("sndWin");
  }
  function I(a) {
    this.shown = !1;
    PIXI.Container.call(this);
    this._buttonsHandler = a;
    a = c.assets.getSprite("dialog");
    a.scale.set(0.5, 0.5);
    a.anchor.set(0.5, 0.5);
    this.addChild(a);
    this.showX = c.gameWidth0 - 30;
    this.showY = c.gameHeight0 - this.height - 40;
    this.hideX = c.gameWidth0 + this.width + 10;
    this.hideY = this.showY;
    this.x = this.hideX;
    this.y = this.hideY;
    a = 1;
    this._buttons = [];
    this._btnsContainer = new PIXI.Container();
    this.addChild(this._btnsContainer);
    for (var b = 0; 3 > b; b++)
      for (var d = 0; 5 > d; d++) {
        var e = new T(a, this._onClick, this);
        e.x += d * (15 + e.width);
        e.y += b * (7 + e.height);
        e.anchor.set(0, 0);
        this._btnsContainer.addChild(e);
        e.setLocked(a > c.levelMng.lastOpened);
        this._buttons.push(e);
        a++;
      }
    this._btnsContainer.y = -7;
    this._btnsContainer.pivot.set(
      this._btnsContainer.width / 2,
      this._btnsContainer.height / 2
    );
    this.pivot.set(this.width / 2, this.height / 2);
  }
  function u(a, b) {
    m.call(this, "Ball", q.zOrder.ball);
    var d = c.assets.getSprite("ball", "atlasGame");
    d.scale.set(0.5, 0.5);
    d.anchor.set(0.5, 0.5);
    this.addChild(d);
    this.x = a;
    this.y = b;
    d = k.createCircleShape(7.5);
    d = k.createFixtureDef(d, 0.5, 0.15, 1, { item: this, isBall: !0 });
    var e = k.createBodyDef(a, b, x.b2_dynamicBody, !1, !0, 0, !0);
    this._body = k.createBody(e, [d]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function O(a, b) {
    m.call(this, "Basket", q.zOrder.basket);
    this.x = a;
    this.y = b;
    var d = c.assets.getSprite("basket", "atlasGame");
    d.scale.set(0.55, 0.55);
    d.anchor.set(0.5, 0.36);
    this.addChild(d);
    d = k.createPolygonShape(22.5, 4, 0, 30);
    d = k.createFixtureDef(d, 0.5, 0.1, 1, this);
    var e = k.createPolygonShape(4, 42, 14.85, 10.85, t.toRadians(15));
    e = k.createFixtureDef(e, 0.5, 0.1, 1, this);
    var g = k.createPolygonShape(4, 42, -14.85, 10.85, t.toRadians(-15));
    g = k.createFixtureDef(g, 0.5, 0.1, 1, this);
    var h = k.createPolygonShape(7.5, 6.6, 22.8, -7.75, t.toRadians(-15));
    h = k.createFixtureDef(h, 0.5, 0.1, 1, this);
    var l = k.createPolygonShape(7.5, 6.6, -22.8, -7.75, t.toRadians(15));
    l = k.createFixtureDef(l, 0.5, 0.1, 1, this);
    var n = k.createPolygonShape(27, 4);
    n = k.createFixtureDef(
      n,
      0.5,
      0.1,
      1,
      { item: this, basketSensor: !0 },
      !0
    );
    var A = k.createBodyDef(a, b, x.b2_staticBody);
    this._body = k.createBody(A, [d, e, g, h, l, n]);
    c.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
  }
  function B(a, b, d, e, g) {
    m.call(this, "BasketRail", q.zOrder.basket);
    this._orienation = 0 == d ? "v" : "h";
    this._end = e;
    this.x = a;
    this.y = b;
    this.id = g;
    d = c.assets.getSprite("railBasket", "atlasGame");
    d.scale.set(0.55, 0.55);
    d.anchor.set(0.5, 0.46);
    this.addChild(d);
    d = k.createPolygonShape(22.5, 4, 0, 30);
    d = k.createFixtureDef(d, 0.5, 0.1, 1, this);
    e = k.createPolygonShape(4, 42, 14.85, 10.85, t.toRadians(15));
    e = k.createFixtureDef(e, 0.5, 0.1, 1, this);
    g = k.createPolygonShape(4, 42, -14.85, 10.85, t.toRadians(-15));
    g = k.createFixtureDef(g, 0.5, 0.1, 1, this);
    var h = k.createPolygonShape(7.5, 6.6, 22.8, -7.75, t.toRadians(-15));
    h = k.createFixtureDef(h, 0.5, 0.1, 1, this);
    var l = k.createPolygonShape(7.5, 6.6, -22.8, -7.75, t.toRadians(15));
    l = k.createFixtureDef(l, 0.5, 0.1, 1, this);
    var n = k.createPolygonShape(27, 4);
    n = k.createFixtureDef(
      n,
      0.5,
      0.1,
      1,
      { item: this, basketSensor: !0 },
      !0
    );
    a = k.createBodyDef(a, b, x.b2_kinematicBody);
    this._body = k.createBody(a, [d, e, g, h, l, n]);
    this._createRails();
    c.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    m.events.on(m.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
    this.sndStart = c.assets.getSound("sndRailStart");
    this.sndStop = c.assets.getSound("sndRailStop");
  }
  function F(a, b) {
    m.call(this, "Cannon", q.zOrder.cannon);
    this.lowerAngle = -45;
    this.upperAngle = 45;
    this.shotScale = 150;
    this.minPower = 250;
    this.maxPower = 500;
    this.x = a;
    this.y = b;
    var d = c.assets.getSprite("cannonPlatform", "atlasGame");
    d.anchor.set(0.5, 1);
    d.scale.set(0.5, 0.5);
    this.addChild(d);
    d = ba.generateFrameNames("cannon_", 1, 15, "", 4);
    d = c.assets.getTextures(d, "atlasGame");
    this._cannon = new PIXI.extras.AnimatedSprite(d);
    this._cannon.anchor.set(0.5, 1.32);
    this._cannon.scale.set(0.5, 0.5);
    this._cannon.animationSpeed = 1;
    this._cannon.loop = !1;
    this.addChildAt(this._cannon, 0);
    this._shotComplete = this._shotComplete.bind(this);
    this._cannon.onComplete = this._shotComplete;
    this._frameChanged = this._frameChanged.bind(this);
    this._cannon.onFrameChange = this._frameChanged;
    this._shot = this._shot.bind(this);
    c.playState.shotHandler.add(this._shot);
    this._helperPoint = new PIXI.Point();
    this._ballSpawnPoint = new PIXI.Point(0, -43);
    this._shoted = !1;
    c.pixi.ticker.add(this._update, this);
    this._isAllowMove = !0;
    c.playState.aimControl &&
      (c.playState.bg.on("pointerdown", this._pointerDown, this),
      c.playState.bg.on("pointerup", this._pointerUp, this),
      (this._isAllowMove = !1));
    this.sndShot = c.assets.getSound("sndShot");
  }
  function ca(a, b) {
    m.call(this, "Domino", q.zOrder.defaultZ);
    this.x = a;
    this.y = b;
    var d = c.assets.getSprite("domino", "atlasGame");
    d.scale.set(0.5, 0.5);
    d.anchor.set(0.5, 0.5);
    this.addChild(d);
    d = k.createPolygonShape(10, 50);
    d = k.createFixtureDef(d, 0.5, 0, 0.5, { item: this });
    var e = k.createBodyDef(a, b, x.b2_dynamicBody);
    this._body = k.createBody(e, [d]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function J(a, b, d, e, g, h) {
    m.call(this, "Gate", q.zOrder.defaultZ);
    var l = 0;
    g = void 0 != g ? g : 90;
    (h = h || !1) && ((l = g), (g = 0), "right" == d && (l = -l));
    this.inversed = h;
    l = t.toRadians(l);
    this.x = a;
    this.y = b;
    this.rotation = l;
    this.openAngle = t.toRadians(g);
    this.direction = d;
    this.opened = !1;
    this.rotation = l;
    this.id = e;
    e = c.assets.getSprite("gate_" + d, "atlasGame");
    e.scale.set(0.5, 0.5);
    "left" == d
      ? e.anchor.set(0.2, 0.5)
      : "right" == d && e.anchor.set(0.8, 0.5);
    this.addChild(e);
    var n;
    "left" == d
      ? (n = k.createPolygonShape(30, 8, 11))
      : "right" == d && (n = k.createPolygonShape(30, 8, -11));
    d = k.createFixtureDef(n, 1, 0.1, 0.1);
    a = k.createBodyDef(a, b, x.b2_kinematicBody, !1, !0, l);
    this._body = k.createBody(a, [d]);
    m.events.on(m.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
    this.sndGate = c.assets.getSound("sndGate");
  }
  function da(a, b, d, e) {
    m.call(this, "Hammer", q.zOrder.defaultZ);
    e = e || 1;
    this.x = a;
    this.y = b;
    this.rotation = d = t.toRadians(d);
    var g = c.assets.getSprite("hammer", "atlasGame");
    g.scale.set(0.5, 0.5);
    g.anchor.set(0.1, 0.5);
    this.addChild(g);
    g = k.createPolygonShape(12, 74, 62, 0);
    g = k.createFixtureDef(g, 0.3, 0.1, e, { item: this });
    var h = k.createPolygonShape(59, 12, 26, 0);
    e = k.createFixtureDef(h, 0.3, 0.1, e, { item: this });
    a = k.createBodyDef(a, b, x.b2_dynamicBody, !1, !0, d);
    this._body = k.createBody(a, [g, e]);
    a = c.physWorld.GetGroundBody();
    b = new oa();
    b.Initialize(a, this._body, this._body.GetPosition());
    c.physWorld.CreateJoint(b);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function K(a, b) {
    m.call(this, "Peg", q.zOrder.defaultZ);
    this.x = a;
    this.y = b;
    var d = c.assets.getSprite("peg", "atlasGame");
    d.scale.set(0.5, 0.5);
    d.anchor.set(0.5, 0.5);
    this.addChild(d);
    d = k.createCircleShape(15);
    d = k.createFixtureDef(d, 0.2, 0.1, 1, { item: this, isPeg: !0 });
    var e = k.createBodyDef(a, b, x.b2_staticBody);
    this._body = k.createBody(e, [d]);
    c.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    this.sndPeg = c.assets.getSound("sndPeg");
  }
  function fa(a, b, d, e) {
    e = t.toRadians(e || 0);
    m.call(this, "Platform", q.zOrder.platform);
    this.x = a;
    this.y = b;
    this.rotation = e;
    var g = c.assets.getSprite("platform", "atlasGame");
    g.scale.set(0.5, 0.5);
    g.anchor.set(0.5, 0.5);
    g.x = c.rnd.realInRange(0, g.width / 2 - d / 2);
    this.addChild(g);
    g = new PIXI.Graphics();
    g.lineStyle(2, 3352345, 1);
    g.drawRect(-d / 2, -7.5, d, 15);
    this.addChild(g);
    g = k.createPolygonShape(d, 15);
    g = k.createFixtureDef(g, 1, 0.1, 1, this);
    a = k.createBodyDef(a, b, x.b2_staticBody, !1, !0, e, !1);
    this._body = k.createBody(a, [g]);
    a = new PIXI.Graphics();
    a.beginFill(9160191, 0.4);
    a.drawRect(-d / 2, -7.5, d, 15);
    a.endFill();
    this.addChild(a);
    this.mask = a;
  }
  function Y(a, b, d, e) {
    m.call(this, "PushButton", q.zOrder.pushButton);
    e = t.toRadians(e);
    this.x = a;
    this.y = b;
    this.rotation = e;
    this.id = d;
    d = ba.generateFrameNames("buttonPush_", 1, 4, "", 4);
    d = c.assets.getTextures(d, "atlasGame");
    this.btn = new PIXI.extras.AnimatedSprite(d);
    this.btn.anchor.set(0.5, 1);
    this.btn.scale.set(0.5, 0.5);
    this.btn.animationSpeed = 0.5;
    this.btn.loop = !1;
    this.addChildAt(this.btn, 0);
    d = k.createPolygonShape(30, 4, 0, -12);
    d = k.createFixtureDef(d, 1, 0, 0.1, { item: this, isSensor: !0 }, !0);
    var g = k.createPolygonShape(40, 8, 0, -4);
    g = k.createFixtureDef(g, 1, 0, 0.1, this);
    a = k.createBodyDef(a, b, x.b2_staticBody, !1, !0, e);
    this._body = k.createBody(a, [d, g]);
    c.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
  }
  function ha(a, b) {
    m.call(this, "Stopper", q.zOrder.defaultZ);
    this.x = a;
    this.y = b;
    var d = c.assets.getSprite("stopper", "atlasGame");
    d.scale.set(0.5, 0.5);
    d.anchor.set(0.5, 0.5);
    this.addChild(d);
    d = k.createCircleShape(5);
    d = k.createFixtureDef(d, 0.2, 0.1, 1, this);
    var e = k.createBodyDef(a, b, x.b2_staticBody);
    this._body = k.createBody(e, [d]);
  }
  function ia(a, b, d) {
    m.call(this, "Swings", q.zOrder.peg);
    d = t.toRadians(d);
    this.x = a;
    this.y = b;
    this.rotation = d;
    var e = c.assets.getSprite("swings", "atlasGame");
    e.scale.set(0.5, 0.5);
    e.anchor.set(0.5, 0.83);
    this.addChild(e);
    e = k.createPolygonShape(60, 11, 0, 0.5);
    e = k.createFixtureDef(e, 1, 0, 0.4, this);
    var g = k.createPolygonShape(11, 30, 0, -20);
    g = k.createFixtureDef(g, 1, 0, 0.4, this);
    a = k.createBodyDef(a, b, x.b2_dynamicBody, !1, !0, d);
    this._body = k.createBody(a, [e, g]);
    a = c.physWorld.GetGroundBody();
    b = new oa();
    b.Initialize(a, this._body, this._body.GetPosition());
    c.physWorld.CreateJoint(b);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function L(a, b, d, e) {
    m.call(this, "Teleport", q.zOrder.teleport);
    e = t.toRadians(e);
    this.x = a;
    this.y = b;
    this.rotation = e;
    this.id = d;
    d = ba.generateFrameNames("teleport_", 1, 20, "", 4);
    d = c.assets.getTextures(d, "atlasGame");
    this.btn = new PIXI.extras.AnimatedSprite(d);
    this.btn.anchor.set(0.5, 0.3);
    this.btn.scale.set(0.5, 0.5);
    this.btn.animationSpeed = 0.5;
    this.btn.loop = !0;
    this.btn.play();
    this.addChildAt(this.btn, 0);
    d = k.createPolygonShape(6, 60, -28, 12);
    d = k.createFixtureDef(d, 1, 0, 0.2);
    var g = k.createPolygonShape(6, 60, 28, 12);
    g = k.createFixtureDef(g, 1, 0, 0.2);
    var h = k.createPolygonShape(60, 6, 0, 39);
    h = k.createFixtureDef(h, 1, 0, 1);
    var l = k.createPolygonShape(60, 6);
    l = k.createFixtureDef(l, 1, 0, 1, { item: this, teleportSensor: !0 }, !0);
    a = k.createBodyDef(a, b, x.b2_staticBody, !0, !0, e);
    this._body = k.createBody(a, [d, g, h, l]);
    c.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    c.physics.contactListener.addEndContactListener(this._onEndContact, this);
    m.events.on(m.EVENT_TELEPORTATION, this._teleportation, this);
    this._inUse = !1;
    this.sndTeleport = c.assets.getSound("sndTeleport");
  }
  function P(a, b, d, e, g) {
    m.call(this, "Tube", q.zOrder.defaultZ);
    e = e || 0;
    g = g || 0;
    d = t.toRadians(d);
    this.x = a;
    this.y = b;
    this.rotation = d;
    var h = t.vectorVelocityRad(d, 100);
    this._force = new V(h.x, h.y);
    h = c.assets.getSprite("tube", "atlasGame");
    h.scale.set(0.5, 0.5);
    h.anchor.set(0.5, 0.5);
    this.addChild(h);
    var l = e + g;
    h = k.createPolygonShape(50, 6, 0, -13.5);
    h = k.createFixtureDef(h, 1, 0.1, 1);
    var n = k.createPolygonShape(50, 6, 0, 13.5);
    n = k.createFixtureDef(n, 1, 0.1, 1);
    e = k.createPolygonShape(50 + l, 10, -e / 2 + g / 2);
    e = k.createFixtureDef(e, 1, 0.1, 1, { item: this, tubeSensor: !0 }, !0);
    a = k.createBodyDef(a, b, x.b2_staticBody, !1, !0, d);
    this._body = k.createBody(a, [n, e, h]);
    this._enableUpdate();
  }
  function ja(a) {
    (m.call(this, "Tutorial", q.zOrder.defaultZ), 1 == a)
      ? ((a = c.assets.getSprite("tutorial1_1", "atlasUI")),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 350),
        (a.y = 100),
        this.addChild(a),
        (a = c.assets.getSprite("tutorial1_2", "atlasUI")),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 300),
        (a.y = 400),
        this.addChild(a))
      : 2 == a &&
        ((a = c.assets.getSprite("tutorial2", "atlasUI")),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 350),
        (a.y = 100),
        this.addChild(a));
  }
  function ea(a, b, d) {
    m.call(this, "WightBall", q.zOrder.peg);
    d = d || 2;
    this.x = a;
    this.y = b;
    var e = c.assets.getSprite("weightBall", "atlasGame");
    e.scale.set(0.5, 0.5);
    e.anchor.set(0.5, 0.5);
    this.addChild(e);
    e = k.createCircleShape(40);
    d = k.createFixtureDef(e, 0.2, 0.1, d, this);
    a = k.createBodyDef(a, b, x.b2_dynamicBody);
    this._body = k.createBody(a, [d]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function Q() {
    if (c.menuState) throw Error("MenuState singelton!");
    c.menuState = this;
    PIXI.Container.call(this);
    c.pixi.stage.addChildAt(this, 0);
    var a = c.assets.getSprite("bg");
    a.scale.set(0.5, 0.5);
    this.addChild(a);
    a = new PIXI.Graphics();
    a.beginFill(0);
    a.alpha = 0.4;
    a.drawRect(0, 0, c.gameWidth0, c.gameHeight0);
    a.endFill();
    this.addChild(a);
    var b = c.assets.getSprite("gameName", null, !0);
    b.scale.set(0.5, 0.5);
    b.x = b.width / 2 + 10;
    b.y = b.height / 2 + 10;
    this.addChild(b);
    a = r.generateButton("btnPlayMenu", "atlasUI", this._onClick, this);
    a.name = "Play";
    a.scale.set(0.5, 0.5);
    a.x = a.width / 2 + 40;
    a.y = b.y + b.height / 2 + a.height / 2 + 30;
    this.addChild(a);
    b = r.generateButton("btnCreditsMenu", "atlasUI", this._onClick, this);
    b.name = "Credits";
    b.scale.set(0.5, 0.5);
    b.x = b.width / 2 + 40;
    b.y = a.y + a.height / 2 + b.height / 2 + 20;
    this.addChild(b);
    this._onBtnsLevelClick = this._onBtnsLevelClick.bind(this);
    this._levelsDialog = new I(this._onBtnsLevelClick);
    this.addChild(this._levelsDialog);
    this._creditsDialog = new W();
    this.addChild(this._creditsDialog);
    a = new U("btnMusicOn", "btnMusicOff", "atlasUI", this._onClick, this);
    a.name = "Music";
    a.scale.set(0.5, 0.5);
    a.x = a.width / 2 + 40;
    a.y = c.gameHeight0 - a.height / 2 - 7;
    a.on = c.musicOn;
    this.addChild(a);
    b = new U("btnSoundOn", "btnSoundOff", "atlasUI", this._onClick, this);
    b.name = "Sound";
    b.scale.set(0.5, 0.5);
    b.x = a.x + a.width / 2 + b.width / 2 + 5;
    b.y = a.y;
    b.on = c.soundOn;
    this.addChild(b);
    this.sndButton = c.assets.getSound("sndButton");
  }
  function q() {
    if (c.playState) throw Error("MenuState singelton!");
    c.playState = this;
    PIXI.Container.call(this);
    c.pixi.stage.addChildAt(this, 0);
    this.aimControl = !c.device.desktop;
    this.bg = c.assets.getSprite("bg");
    this.bg.scale.set(0.5, 0.5);
    this.bg.interactive = !0;
    this.aimControl || this.bg.on("pointerdown", this._onStageClick, this);
    this.addChild(this.bg);
    var a = new PIXI.Graphics();
    a.alpha = 0.6;
    a.beginFill(0);
    a.drawRect(0, 0, c.gameWidth0, c.gameHeight0);
    a.endFill();
    this.addChild(a);
    this.shotHandler = new y();
    this._onGameLayerChildAdded = this._onGameLayerChildAdded.bind(this);
    this.gameLayer = new PIXI.Container();
    this.gameLayer.onChildrenChange = this._onGameLayerChildAdded;
    this.addChild(this.gameLayer);
    this.ballLayer = new PIXI.Container();
    this.ballLayer.zOrder = q.zOrder.ball;
    this.gameLayer.addChild(this.ballLayer);
    this.uiLayer = new PIXI.Container();
    this.addChild(this.uiLayer);
    this._createUI();
    this._levelComplete = new X(this._onBtnsClick, this);
    this._levelComplete.hide();
    this.addChild(this._levelComplete);
    this._isComplete = !1;
    c.levelMng.create();
    1 <= c.levelMng.currLevel &&
      2 >= c.levelMng.currLevel &&
      this.gameLayer.addChild(new ja(c.levelMng.currLevel));
    this.sndButton = c.assets.getSound("sndButton");
    this.aimControl &&
      ((this.aim = c.assets.getSprite("aim")),
      this.aim.scale.set(0.5, 0.5),
      this.aim.anchor.set(0.5, 0.5),
      (this.aim.visible = !1),
      this.addChild(this.aim));
  }
  function R() {
    this.currLevel = 1;
    this.lastOpened = c.storage.get(c.SAVE_KEY_LAST_OPENED) || 1;
    this.totalLevels = pa.length;
  }
  function S() {
    PIXI.Container.call(this);
    c.pixi.stage.addChild(this);
    var a = new PIXI.Graphics();
    a.beginFill(0);
    a.drawRect(0, 0, c.gameWidth0, c.gameHeight0);
    a.endFill();
    this.addChild(a);
  }
  function ka() {
    var a = p.innerWidth,
      b = p.innerHeight,
      d = c.gameWidth0 / c.gameHeight0,
      e = Math.floor(a),
      g = Math.floor(b);
    var h =
      (1 > d && a >= b
        ? (e = Math.floor(b * d))
        : 1 <= d && a <= b
        ? (g = Math.floor(a / d))
        : Math.floor(b * d) > a
        ? (g = Math.floor(a / d))
        : (e = Math.floor(b * d)),
      { width: e, height: g });
    c.gameWidth1 = h.width;
    c.gameHeight1 = h.height;
    c.scale = c.gameWidth1 / c.gameWidth0;
    c.gameMaxWidth1 = c.gameMaxWidth0 * c.scale;
    c.gameMaxHeight1 = c.gameMaxHeight0 * c.scale;
    c.canvasWidth = c.gameMaxWidth1 > a ? a : c.gameMaxWidth1;
    c.canvasHeight = c.gameMaxHeight1 > b ? b : c.gameMaxHeight1;
    h = document.body;
    h.style.width = c.canvasWidth + "px";
    h.style.height = c.canvasHeight + "px";
    h.style.marginLeft = a / 2 - c.canvasWidth / 2 + "px";
    h.style.marginTop = b / 2 - c.canvasHeight / 2 + "px";
    c.inited
      ? ((c.pixi.renderer.autoResize = !0),
        c.pixi.renderer.resize(c.canvasWidth, c.canvasHeight),
        c.pixi.stage.scale.set(c.scale, c.scale),
        c.physics.enabledDD && c.physics.updateCanvasSize())
      : wa();
    c.resizeHandler && c.resizeHandler.call();
    c.imgRotate &&
      (c.imgRotate.position.set(c.canvasWidth / 2, c.canvasHeight / 2),
      (c.imgRotate.scale.x = c.imgRotate.scale.y = c.scale));
  }
  function wa() {
    if (
      ((c.device = new Device()),
      (c.audioEnabled = c.device.canPlayAudio("ogg")),
      c.device.android && !c.device.chrome)
    ) {
      var a = document.createElement("p"),
        b = document.createTextNode(
          "This game doesn't work correctly in default Android browser. Please install Chrome on your device."
        );
      return (
        a.appendChild(b), void document.getElementById("msg").appendChild(a)
      );
    }
    a = document.getElementById("msg");
    a.parentNode.removeChild(a);
    c.pixi = new PIXI.Application(c.canvasWidth, c.canvasHeight, {
      antialias: !0,
    });
    c.pixi.renderer.backgroundColor = 0;
    c.pixi.stage.scale.set(c.scale, c.scale);
    document.body.appendChild(c.pixi.view);
    document.ontouchstart = function (d) {
      d.preventDefault();
    };
    document.body.addEventListener(
      "selectstart",
      function (d) {
        d.preventDefault();
      },
      !1
    );
    console.log(c.pixi.renderer.view.width, c.pixi.renderer.view.height);
    c.physics = new k(!1);
    c.browserEvents = new C();
    c.browserEvents.on("onResize", ka);
    c.browserEvents.on("onOrientationChange", ka);
    c.storage = new aa();
    a = [];
    a.push(c.SAVE_KEY_LAST_OPENED, c.SAVE_KEY_MUSIC, c.SAVE_KEY_SOUND);
    c.storage.read(a);
    c.assets = new N(c);
    c.rnd = new na([(Date.now() * Math.random()).toString()]);
    try {
      c.fps = new FPSMeter(document.body);
    } catch (d) {}
    if (
      ((c.levelMng = new R()),
      (c.shutter = new S()),
      c.pixi.stage.addChild((c.preloader = new M())),
      (PIXI.loader.baseUrl = "assets"),
      PIXI.loader
        .add("atlasUI", "images/atlasUI.json")
        .add("atlasGame", "images/atlasGame.json")
        .add("splash", "images/splash.png")
        .add("bg", "images/bg.png"),
      c.audioEnabled)
    )
      (a = c.device.iOS ? ".m4a" : ".ogg"),
        PIXI.loader
          .add("sndButton", "audio/buttons" + a)
          .add("sndGate", "audio/gate" + a)
          .add("sndPeg", "audio/peg" + a)
          .add("sndRailStart", "audio/railStart" + a)
          .add("sndRailStop", "audio/railStop" + a)
          .add("sndShot", "audio/shot" + a)
          .add("sndTeleport", "audio/teleport" + a)
          .add("sndTheme", "audio/theme" + a)
          .add("sndTube", "audio/tube" + a)
          .add("sndWin", "audio/win" + a);
    PIXI.loader.on("progress", xa).load(ya);
    c.inited = !0;
  }
  function xa(a, b) {
    (console.log("loading: " + b.url), c.preloader) &&
      c.preloader.setLoading(Math.round(a.progress));
  }
  function ya() {
    c.preloader
      ? (c.preloader.setLoading(100), c.preloader.loadedCallback(za))
      : qa();
  }
  function za() {
    c.splash = new Z();
    c.splash.runAfter(qa);
    c.pixi.stage.addChild(c.splash);
  }
  function qa() {
    if (c.preloader) {
        c.preloader.destroy();
        c.preloader = null;
    }
    if (c.splash) {
        c.splash.destroy();
        c.splash = null;
    }
    
    c._checkAudio();
    new Q();
    c.shutter.hide();
}

  r.prototype = Object.create(PIXI.Sprite.prototype);
  r.prototype.constructor = r;
  r.prototype.destroy = function () {
    this.disposed ||
      ((this.disposed = !0),
      this.parent && this.parent.removeChild(this),
      this.onClick.dispose(),
      (this.onClick = null),
      this.onDown.dispose(),
      (this.onDown = null),
      this.onUp.dispose(),
      (this.onUp = null),
      this.onOut.dispose(),
      (this.onOut = null),
      this._label && (this._label.destroy(), (this._label = null)),
      (this.mousedown = this.touchstart = null),
      (this.mouseup =
        this.touchend =
        this.mouseupoutside =
        this.touchendoutside =
          null),
      (this.mouseover = null),
      (this.mouseout = null),
      (this.click = null),
      (this.interactive = !1),
      (this._cacheAnchorY = null));
  };
  r.prototype.setOpenURL = function (a) {
    this.disposed ||
      this.onClick.add(function (b) {
        p.open(a, "_blank");
      });
  };
  r.prototype.setIcon = function (a, b, d, e, g) {
    if (!this.disposed) {
      d = d || 0;
      e = e || 0;
      g = g || 1;
      if ("string" == typeof a) var h = this.app.assets.getTexture(a, b);
      else if (a instanceof PIXI.Texture) h = a;
      else if (a instanceof PIXI.Sprite) this.icon = a;
      else if (null == a && this.icon)
        return this.removeChild(this.icon), void (this.icon = null);
      h &&
        (this.icon
          ? this.icon.setTexture(h)
          : (this.icon = new PIXI.Sprite(h)));
      this.icon.anchor.set(0.5, 0.5);
      this.icon.x = d;
      this.icon.y = e;
      this.icon.scale.set(g, g);
      this.addChild(this.icon);
    }
  };
  r.prototype.setLabel = function (a, b, d, e) {
    a = a || "";
    d = d || 0;
    e = e || 0;
    this._label ||
      ((this._label = new PIXI.Text(a, b)), this.addChild(this._label));
    this._label.text = a;
    b && (this._label.style = b);
    this._label.x = this.width / 2 - this._label.width / 2 + d;
    this._label.y = this.height / 2 - this._label.height / 2 + e;
  };
  r.prototype._mouseOver = function (a) {
    this.disposed ||
      ((this.isOver = !0), this.isDown || (this.tint = this.overTint));
  };
  r.prototype._mouseOut = function (a) {
    this.disposed ||
      ((this.isOver = !1),
      this.onOut.call(a),
      this.isDown || (this.tint = this.upTint));
  };
  r.prototype._mouseDown = function (a) {
    this.disposed ||
      ((this.isDown = !0), (this.tint = this.downTint), this.onDown.call(a));
  };
  r.prototype._mouseUp = function (a) {
    this.disposed ||
      ((this.isDown = !1),
      this.isOver ? (this.tint = this.overTint) : (this.tint = this.upTint),
      this.onUp.call(a));
  };
  r.prototype._clickTap = function (a) {
    this.disposed || this.onClick.call(a);
  };
  Object.defineProperty(r.prototype, "enable", {
    get: function () {
      return this.interactive;
    },
    set: function (a) {
      this.disposed ||
        ((this.interactive = a),
        !1 === a
          ? ((this.isOver = !1),
            this._mouseUp(),
            (this.tint = this.disableTint))
          : (this.tint = this.upTint));
    },
  });
  r.generateButton = function (a, b, d, e) {
    a = c.assets.getTexture(a, b);
    return new r(a, d, e);
  };
  m.prototype = Object.create(PIXI.Container.prototype);
  m.prototype.constructor = m;
  m.prototype.destroy = function () {
    PIXI.Container.prototype.destroy.call(this);
    this._body && c.physWorld.DestroyBody(this._body);
    this._body = null;
    c.pixi.ticker.remove(this._update, this);
  };
  m.prototype.setPosition = function (a, b) {
    if (this._body) {
      var d = this;
      c.physics.doIt(function () {
        d._body.SetPosition(new V(a / c.physScale, b / c.physScale));
      });
    }
    this.position.set(a, b);
  };
  m.prototype._enableUpdate = function () {
    c.pixi.ticker.add(this._update, this);
  };
  m.prototype._disableUpdate = function () {
    c.pixi.ticker.remove(this._update, this);
  };
  m.prototype._update = function () {
    this.angleUpdate && (this.rotation = this._body.GetAngle());
    this.positionUpdate &&
      ((this.x = this._body.GetPosition().x * c.physScale),
      (this.y = this._body.GetPosition().y * c.physScale));
  };
  m.events = new EventEmitter();
  m.EVENT_TRIGGER_PRESSED = "TriggerPressed";
  m.EVENT_TELEPORTATION = "Teleportation";
  M.prototype = Object.create(PIXI.Container.prototype);
  M.prototype.constructor = M;
  M.prototype.setLoading = function (a) {
    this._loaded = a;
  };
  M.prototype.loadedCallback = function (a) {
    this._loadedCB = a;
  };
  M.prototype._update = function () {
    this._curr < this._loaded &&
      (this._curr = Math.round(this._curr + 2 * c.pixi.ticker.deltaTime));
    this._curr > this._loaded && (this._curr = this._loaded);
    this._txtLoading.text = "Loading " + this._curr + "%";
    100 == this._curr &&
      (c.pixi.ticker.remove(this._update, this),
      this._loadedCB && setTimeout(this._loadedCB, 500));
  };
  Z.prototype = Object.create(PIXI.Container.prototype);
  Z.prototype.constructor = Z;
  Z.prototype.runAfter = function (a, b) {
    setTimeout(a, void 0 != b ? b : 1e3);
  };
  N.prototype.constructor = N;
  N.prototype.getTexture = function (a, b) {
    return b
      ? PIXI.loader.resources[b].textures[a]
      : PIXI.utils.TextureCache[a];
  };
  N.prototype.getTextures = function (a, b) {
    var d = b ? PIXI.loader.resources[b].textures : PIXI.utils.TextureCache;
    for (var e = [], g = 0; g < a.length; g++) e.push(d[a[g]]);
    return e;
  };
  N.prototype.getSprite = function (a, b, d) {
    a = new PIXI.Sprite(this.getTexture(a, b));
    return d && a.anchor.set(0.5, 0.5), a;
  };
  N.prototype.getSound = function (a) {
    return 0 == c.audioEnabled ? null : PIXI.loader.resources[a].sound;
  };
  C.prototype.constructor = C;
  C.prototype._onVisibilityChange = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = !1 === document.hidden ? "onPageShow" : "onPageHide";
    this.emit(this._event);
  };
  C.prototype._onWebkitVisibilityChange = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type =
      !1 === document.webkitHidden ? "onPageShow" : "onPageHide";
    this.emit(this._event);
  };
  C.prototype._onPageShow = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onPageShow";
    this.emit(this._event);
  };
  C.prototype._onPageHide = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onPageHide";
    this.emit(this._event);
  };
  C.prototype._onFocus = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onFocusGet";
    this.emit(this._event);
  };
  C.prototype._onBlur = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onFocusLost";
    this.emit(this._event);
  };
  C.prototype._onResize = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onResize";
    this.emit(this._event);
    var b = this._getOrientation();
    this.orientation !== b &&
      ((this._event.orientation = this.orientation = b),
      this._onOrientationChange(a));
  };
  C.prototype._onOrientationChange = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onOrientationChange";
    this._event.orientation = this.orientation = this._getOrientation();
    this.emit(this._event);
  };
  C.prototype._getOrientation = function () {
    return p.innerWidth > p.innerHeight ? "landscape" : "portrait";
  };
  EventTarget = function () {
    var a = {};
    this.addEventListener = this.on = function (b, d) {
      void 0 === a[b] && (a[b] = []);
      -1 === a[b].indexOf(d) && a[b].push(d);
    };
    this.dispatchEvent = this.emit = function (b) {
      if (a[b.type] && a[b.type].length)
        for (var d = 0, e = a[b.type].length; d < e; d++) a[b.type][d](b);
    };
    this.removeEventListener = this.off = function (b, d) {
      var e = a[b].indexOf(d);
      -1 !== e && a[b].splice(e, 1);
    };
    this.removeAllEventListeners = function (b) {
      (b = a[b]) && (b.length = 0);
    };
  };
  z.prototype = Object.create(PIXI.Sprite.prototype);
  z.prototype.constructor = z;
  z.prototype.destroy = function () {
    this.disposed ||
      ((this.disposed = !0),
      this.parent && this.parent.removeChild(this),
      this.onClick.dispose(),
      (this.onClick = null),
      this.onDown.dispose(),
      (this.onDown = null),
      this.onUp.dispose(),
      (this.onUp = null),
      this.onOut.dispose(),
      (this.onOut = null),
      (this.up = null),
      (this.over = null),
      (this.down = null),
      (this.mousedown = this.touchstart = null),
      (this.mouseup =
        this.touchend =
        this.mouseupoutside =
        this.touchendoutside =
          null),
      (this.mouseover = null),
      (this.mouseout = null),
      (this.click = null),
      (this.interactive = !1),
      (this._cacheAnchorY = null));
  };
  z.prototype.setOpenURL = function (a) {
    this.disposed ||
      this.onClick.add(function (b) {
        p.open(a, "_blank");
      });
  };
  z.prototype._mouseOver = function (a) {
    this.disposed ||
      ((this.isOver = !0),
      this.isDown ||
        (this.over
          ? (this.texture = this.over)
          : ((this._cacheAnchorY = this.anchor.y), (this.anchor.y -= 0.01))));
  };
  z.prototype._mouseOut = function (a) {
    this.disposed ||
      ((this.isOver = !1),
      this.onOut.call(a),
      this.isDown ||
        ((this.texture = this.up),
        this._cacheAnchorY &&
          ((this.anchor.y = this._cacheAnchorY), (this._cacheAnchorY = null))));
  };
  z.prototype._mouseDown = function (a) {
    this.disposed ||
      ((this.isDown = !0),
      this.down && (this.texture = this.down),
      this.onDown.call(a));
  };
  z.prototype._mouseUp = function (a) {
    this.disposed ||
      ((this.isDown = !1),
      this.isOver
        ? this.over
          ? (this.texture = this.over)
          : (this.anchor.y = this._cacheAnchorY - 0.01)
        : ((this.texture = this.up),
          this._cacheAnchorY &&
            ((this.anchor.y = this._cacheAnchorY),
            (this._cacheAnchorY = null))),
      this.onUp.call(a));
  };
  z.prototype._clickTap = function (a) {
    this.disposed || this.onClick.call(a);
  };
  Object.defineProperty(z.prototype, "enable", {
    get: function () {
      return this.interactive;
    },
    set: function (a) {
      this.disposed ||
        ((this.interactive = a),
        !1 === a && ((this.isOver = !1), this._mouseUp()));
    },
  });
  z.generateButton = function (a, b, d, e) {
    var g = c.assets.getTexture(a + "up", b);
    try {
      var h = c.assets.getTexture(a + "over", b);
    } catch (n) {}
    try {
      var l = c.assets.getTexture(a + "down", b);
    } catch (n) {}
    return new z(g, h, l, d, e);
  };
  T.prototype = Object.create(r.prototype);
  T.prototype.constructor = T;
  T.prototype.setLocked = function (a) {
    this._lock ||
      ((this._lock = c.assets.getSprite("icoLock", "atlasUI")),
      (this._lock.x = this.width),
      (this._lock.y = this.height),
      this._lock.anchor.set(0.5, 0.5),
      this.addChild(this._lock));
    this._lock.visible = a;
    this._label.visible = !a;
    this.enable = !a;
  };
  U.prototype = Object.create(PIXI.Container.prototype);
  U.prototype.constructor = T;
  U.prototype._onClick = function (a) {
    a.target == this._on
      ? (this.on = !1)
      : a.target == this._off && (this.on = !0);
    a.target = this;
    a.isOn = this.on;
    this._callback.call(this._callbackScope, a);
  };
  Object.defineProperty(U.prototype, "on", {
    get: function () {
      return this._on.visible;
    },
    set: function (a) {
      this.disposed || ((this._on.visible = a), (this._off.visible = !a));
    },
  });
  D.__id = 0;
  D.prototype.add = function (a) {
    return 0 <= this._arr.indexOf(a)
      ? void 0
      : void (this._arr[this._arr.length] = a);
  };
  D.prototype.remove = function (a) {
    a = this._arr.indexOf(a);
    return 0 > a ? void 0 : void this._arr.splice(a, 1);
  };
  D.prototype.at = function (a) {
    return (
      0 > a
        ? (this.throwIfOut &&
            Error("Index is lower than zero. [" + this.name + "]."),
          (a = 0))
        : a >= this._arr.length &&
          (this.throwIfOut &&
            Error("Index is higher than total. [" + this.name + "]."),
          (a = this._arr.length - 1)),
      this._arr[a]
    );
  };
  D.prototype.first = function () {
    return this._arr[0];
  };
  D.prototype.last = function () {
    return this._arr[this._arr.length - 1];
  };
  D.prototype.getByProperty = function (a, b) {
    if (null == a || null == b) return null;
    for (var d = this.total(), e = 0; e < d; e++) {
      var g = this._arr[e];
      if (g[a] && g[a] == b) return g;
    }
    return null;
  };
  D.prototype.has = function (a) {
    return 0 <= this._arr.indexOf(a);
  };
  D.prototype.clear = function () {
    this._arr.splice(0, this._arr.length);
  };
  D.prototype.total = function () {
    return this._arr.length;
  };
  G.prototype = Object.create(Box2D.Dynamics.b2ContactListener.prototype);
  G.prototype.constructor = G;
  G.prototype.BeginContact = function (a) {
    this._ee.emit(this._eventNameBeginContact, a);
  };
  G.prototype.EndContact = function (a) {
    this._ee.emit(this._eventNameEndContact, a);
  };
  G.prototype.addBeginContactListener = function (a, b) {
    this._ee.on(this._eventNameBeginContact, a, b);
  };
  G.prototype.removeBeginContactListener = function (a, b) {
    this._ee.off(this._eventNameBeginContact, a, b);
  };
  G.prototype.addEndContactListener = function (a, b) {
    this._ee.on(this._eventNameEndContact, a, b);
  };
  G.prototype.removeEndContactListener = function (a, b) {
    this._ee.off(this._eventNameEndContact, a, b);
  };
  Device = function () {
    this.ie =
      this.firefox =
      this.epiphany =
      this.chrome =
      this.arora =
      this.quirksMode =
      this.vibration =
      this.typedArray =
      this.pointerLock =
      this.css3D =
      this.mspointer =
      this.touch =
      this.worker =
      this.webGL =
      this.localStorage =
      this.fileSystem =
      this.file =
      this.canvas =
      this.windows =
      this.macOS =
      this.linux =
      this.chromeOS =
      this.android =
      this.ejecta =
      this.cocoonJS =
      this.iOS =
      this.desktop =
      this.patchAndroidClearRectBug =
        !1;
    this.ieVersion = 0;
    this.trident = !1;
    this.tridentVersion = 0;
    this.iPad =
      this.iPhone4 =
      this.iPhone =
      this.webm =
      this.m4a =
      this.wav =
      this.mp3 =
      this.opus =
      this.ogg =
      this.webAudio =
      this.audioData =
      this.silk =
      this.webApp =
      this.safari =
      this.opera =
      this.midori =
      this.mobileSafari =
        !1;
    this.pixelRatio = 0;
    this.littleEndian = !1;
    this._checkAudio();
    this._checkBrowser();
    this._checkCSS3D();
    this._checkDevice();
    this._checkFeatures();
    this._checkOS();
  };
  Device.prototype = {
    _checkOS: function () {
      var a = navigator.userAgent;
      /Android/.test(a)
        ? (this.android = !0)
        : /CrOS/.test(a)
        ? (this.chromeOS = !0)
        : /iP[ao]d|iPhone/i.test(a)
        ? (this.iOS = !0)
        : /Linux/.test(a)
        ? (this.linux = !0)
        : /Mac OS/.test(a)
        ? (this.macOS = !0)
        : /Windows/.test(a) && (this.windows = !0);
      (this.windows || this.macOS || (this.linux && !1 === this.silk)) &&
        (this.desktop = !0);
    },
    _checkFeatures: function () {
      this.canvas = !!p.CanvasRenderingContext2D;
      try {
        this.localStorage = !!localStorage.getItem;
      } catch (d) {
        this.localStorage = !1;
      }
      this.file = !!(p.File && p.FileReader && p.FileList && p.Blob);
      this.fileSystem = !!p.requestFileSystem;
      try {
        var a = document.createElement("canvas");
        var b =
          !!p.WebGLRenderingContext &&
          (a.getContext("webgl") || a.getContext("experimental-webgl"));
      } catch (d) {
        b = !1;
      }
      this.webGL = b;
      null === this.webGL || !1 === this.webGL
        ? (this.webGL = !1)
        : (this.webGL = !0);
      this.worker = !!p.Worker;
      ("ontouchstart" in document.documentElement ||
        (p.navigator.maxTouchPoints && 1 < p.navigator.maxTouchPoints)) &&
        (this.touch = !0);
      (p.navigator.msPointerEnabled || p.navigator.pointerEnabled) &&
        (this.mspointer = !0);
      this.pointerLock =
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document;
      this.quirksMode = "CSS1Compat" !== document.compatMode;
    },
    _checkBrowser: function () {
      var a = navigator.userAgent;
      /Arora/.test(a)
        ? (this.arora = !0)
        : /Chrome/.test(a)
        ? (this.chrome = !0)
        : /Epiphany/.test(a)
        ? (this.epiphany = !0)
        : /Firefox/.test(a)
        ? (this.firefox = !0)
        : /Mobile Safari/.test(a)
        ? (this.mobileSafari = !0)
        : /MSIE (\d+\.\d+);/.test(a)
        ? ((this.ie = !0), (this.ieVersion = parseInt(RegExp.$1, 10)))
        : /Midori/.test(a)
        ? (this.midori = !0)
        : /Opera/.test(a)
        ? (this.opera = !0)
        : /Safari/.test(a)
        ? (this.safari = !0)
        : /Silk/.test(a)
        ? (this.silk = !0)
        : /Trident\/(\d+\.\d+);/.test(a) &&
          ((this.ie = !0),
          (this.trident = !0),
          (this.tridentVersion = parseInt(RegExp.$1, 10)));
      navigator.standalone && (this.webApp = !0);
      navigator.isCocoonJS && (this.cocoonJS = !0);
      "undefined" != typeof p.ejecta && (this.ejecta = !0);
    },
    _checkAudio: function () {
      this.audioData = !!p.Audio;
      this.webAudio = !(!p.webkitAudioContext && !p.AudioContext);
      var a = document.createElement("audio");
      try {
        a.canPlayType &&
          (a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, "") &&
            (this.ogg = !0),
          a.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, "") &&
            (this.opus = !0),
          a.canPlayType("audio/mpeg;").replace(/^no$/, "") && (this.mp3 = !0),
          a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "") &&
            (this.wav = !0),
          (a.canPlayType("audio/x-m4a;") ||
            a.canPlayType("audio/aac;").replace(/^no$/, "")) &&
            (this.m4a = !0),
          a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "") &&
            (this.webm = !0));
      } catch (b) {}
    },
    _checkDevice: function () {
      this.pixelRatio = p.devicePixelRatio || 1;
      this.iPhone = -1 != navigator.userAgent.toLowerCase().indexOf("iphone");
      this.iPhone4 = 2 == this.pixelRatio && this.iPhone;
      this.iPad = -1 != navigator.userAgent.toLowerCase().indexOf("ipad");
      "undefined" != typeof Int8Array
        ? ((this.littleEndian =
            0 < new Int8Array(new Int16Array([1]).buffer)[0]),
          (this.typedArray = !0))
        : ((this.littleEndian = !1), (this.typedArray = !1));
      navigator.vibrate =
        navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate;
      navigator.vibrate && (this.vibration = !0);
    },
    _checkCSS3D: function () {
      var a,
        b = document.createElement("p"),
        d = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform",
        };
      document.body.insertBefore(b, null);
      for (var e in d)
        void 0 !== b.style[e] &&
          ((b.style[e] = "translate3d(1px,1px,1px)"),
          (a = p.getComputedStyle(b).getPropertyValue(d[e])));
      document.body.removeChild(b);
      this.css3D = void 0 !== a && 0 < a.length && "none" !== a;
    },
    canPlayAudio: function (a) {
      return (
        !("mp3" != a || !this.mp3) ||
        !("ogg" != a || (!this.ogg && !this.opus)) ||
        !("m4a" != a || !this.m4a) ||
        !("wav" != a || !this.wav) ||
        !("webm" != a || !this.webm)
      );
    },
    isConsoleOpen: function () {
      return (
        !(!p.console || !p.console.firebug) ||
        (!!p.console &&
          (console.profile(),
          console.profileEnd(),
          console.clear && console.clear(),
          0 < console.profiles.length))
      );
    },
  };
  Device.prototype.constructor = Device;
  y.prototype.dispose = function () {
    this.disposed ||
      ((this.disposed = !0),
      (this.count = 0),
      (this._callbacks = null),
      (this._doItAfter = null));
  };
  y.prototype.has = function (a, b) {
    if (!this.disposed) return 0 <= this._callbacks.indexOf(a);
  };
  y.prototype.add = function (a) {
    if (!this.disposed && !this.has(a)) {
      var b = this,
        d = function () {
          b._callbacks[b.count] = a;
          b.count++;
        };
      this._blocked ? (this._doItAfter[this._doItAfter.length] = d) : d();
    }
  };
  y.prototype.remove = function (a) {
    if (!(this.disposed || 0 > this._callbacks.indexOf(a))) {
      var b = this,
        d = function () {
          var e = b._callbacks.indexOf(a);
          b._callbacks.splice(e, 1);
          b.count--;
        };
      this._blocked ? (this._doItAfter[this._doItAfter.length] = d) : d();
    }
  };
  y.prototype.call = function () {
    if (!this.disposed && 0 < this._callbacks.length) {
      var a;
      this._blocked = !0;
      for (a = this._callbacks.length - 1; 0 <= a; a--)
        this._callbacks[a].apply(
          null,
          0 < arguments.length ? Array.prototype.slice.call(arguments) : null
        );
      if (
        ((this._blocked = !1), !this.disposed) &&
        0 < this._doItAfter.length
      ) {
        for (a = this._doItAfter.length - 1; 0 <= a; a--) this._doItAfter[a]();
        this._doItAfter.splice(0, this._doItAfter.length);
      }
    }
  };
  w.prototype.constructor = w;
  var la = "";
  w.prototype.collectInteractiveSprite = function (a, b) {
    for (var d = a.children, e = d.length, g = 0; g < e; g++) {
      var h = d[g];
      (!1 === h.visible && !1 === this.interactInvisible) ||
        (h.interactive
          ? (console.log(la, h.name),
            (h.__iParent = b),
            this.interactiveItems.push(h),
            0 < h.children.length &&
              ((la += "\t"), this.collectInteractiveSprite(h, h)))
          : ((h.__iParent = null),
            0 < h.children.length && this.collectInteractiveSprite(h, b)));
    }
    la = "";
  };
  w.prototype.setTarget = function (a) {
    this.target = a;
    null === this.interactionDOMElement && this.setTargetDomElement(a.view);
    document.body.addEventListener("mouseup", this.onMouseUp, !0);
  };
  w.prototype.setTargetDomElement = function (a) {
    null !== this.interactionDOMElement &&
      ((this.interactionDOMElement.style["-ms-content-zooming"] = ""),
      (this.interactionDOMElement.style["-ms-touch-action"] = ""),
      this.interactionDOMElement.removeEventListener(
        "mousemove",
        this.onMouseMove,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "mousedown",
        this.onMouseDown,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "mouseout",
        this.onMouseOut,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "touchstart",
        this.onTouchStart,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "touchend",
        this.onTouchEnd,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "touchmove",
        this.onTouchMove,
        !0
      ));
    p.navigator.msPointerEnabled &&
      ((a.style["-ms-content-zooming"] = "none"),
      (a.style["-ms-touch-action"] = "none"));
    this.interactionDOMElement = a;
    a.addEventListener("mousemove", this.onMouseMove, !0);
    a.addEventListener("mousedown", this.onMouseDown, !0);
    a.addEventListener("mouseout", this.onMouseOut, !0);
    a.addEventListener("touchstart", this.onTouchStart, !0);
    a.addEventListener("touchend", this.onTouchEnd, !0);
    a.addEventListener("touchmove", this.onTouchMove, !0);
  };
  w.prototype.update = function () {
    if (this.target) {
      var a = Date.now(),
        b = a - this.last;
      if (((b = (30 * b) / 1e3), !(1 > b))) {
        this.last = a;
        this.dirty &&
          ((this.dirty = !1),
          (this.interactiveItems = []),
          this.stage.interactive && this.interactiveItems.push(this.stage),
          this.collectInteractiveSprite(this.stage, this.stage));
        this.interactionDOMElement.style.cursor = "inherit";
        b = this.interactiveItems.length;
        for (a = b - 1; 0 <= a; a--) {
          var d = this.interactiveItems[a];
          !(d.mouseover || d.mouseout || d.buttonMode) ||
            (d.__iParent && d.__iParent.__target) ||
            ((d.__hit = null != d.__target || this.hitTest(d, this.mouse)),
            d.__hit
              ? (d.buttonMode &&
                  (this.interactionDOMElement.style.cursor = d.defaultCursor),
                d.__iParent && (d.__iParent.__target = d),
                d.__target
                  ? (this.mouse.target = d.__target)
                  : (this.mouse.target = d),
                d.__isOver ||
                  (d.mouseover && d.mouseover(this.mouse), (d.__isOver = !0)))
              : d.__isOver &&
                (d.mouseout && d.mouseout(this.mouse), (d.__isOver = !1)));
        }
        for (a = b - 1; 0 <= a; a--)
          (d = this.interactiveItems[a]), (d.__target = null);
      }
    }
  };
  w.prototype.onMouseMove = function (a) {
    this.mouse.originalEvent = a || p.event;
    var b = this.interactionDOMElement.getBoundingClientRect();
    this.mouse.global.x = (this.target.width / b.width) * (a.clientX - b.left);
    this.mouse.global.y = (this.target.height / b.height) * (a.clientY - b.top);
    a = this.interactiveItems.length;
    for (b = 0; b < a; b++) {
      var d = this.interactiveItems[b];
      d.mousemove && d.mousemove(this.mouse);
    }
  };
  w.prototype.onMouseDown = function (a) {
    this.mouse.originalEvent = a || p.event;
    a = this.interactiveItems.length;
    for (
      var b = function (l, n) {
          return l === n || (!!l.__target && b(l.__target, n));
        },
        d = null,
        e = 0,
        g = a - 1;
      0 <= g;
      g--
    ) {
      var h = this.interactiveItems[g];
      h.mousedown || h.click
        ? (h != d && d && 0 == b(h, d)) ||
          ((h.__hit = h.__target || this.hitTest(h, this.mouse)),
          e++,
          h.__hit &&
            (d || (d = h),
            h.__iParent && (h.__iParent.__target = h.__target || h),
            (this.mouse.target = h.__target || h),
            h.mousedown && h.mousedown(this.mouse),
            (h.__isDown = !0)))
        : (h.__iParent.__target = h.__target);
    }
    console.log(e, a);
    for (g = a - 1; 0 <= g; g--)
      (h = this.interactiveItems[g]), (h.__target = null);
  };
  w.prototype.onMouseOut = function () {
    var a = this.interactiveItems.length;
    this.interactionDOMElement.style.cursor = "inherit";
    for (var b = 0; b < a; b++) {
      var d = this.interactiveItems[b];
      d.__isOver &&
        ((this.mouse.target = d),
        d.mouseout && d.mouseout(this.mouse),
        (d.__isOver = !1));
    }
  };
  w.prototype.onMouseUp = function (a) {
    this.mouse.originalEvent = a || p.event;
    a = this.interactiveItems.length;
    for (var b = !1, d = 0; d < a; d++) {
      var e = this.interactiveItems[d];
      e.__hit = this.hitTest(e, this.mouse);
      e.__hit && !b
        ? (e.mouseup && e.mouseup(this.mouse),
          e.__isDown && e.click && e.click(this.mouse),
          e.interactiveChildren || (b = !0))
        : e.__isDown && e.mouseupoutside && e.mouseupoutside(this.mouse);
      e.__isDown = !1;
    }
  };
  w.prototype.hitTest = function (a, b) {
    var d = b.global;
    if (!a.worldVisible) return !1;
    var e = a instanceof PIXI.Sprite,
      g = a.worldTransform,
      h = g[0],
      l = g[1],
      n = g[2],
      A = g[3],
      v = g[4];
    g = g[5];
    var E = 1 / (h * v + l * -A);
    l = v * E * d.x + -l * E * d.y + (g * l - n * v) * E;
    d = h * E * d.y + -A * E * d.x + (-g * h + n * A) * E;
    if (a.hitArea && a.hitArea.contains)
      return !!a.hitArea.contains(l, d) && ((b.target = a), !0);
    if (e) {
      var H;
      e = a.texture.frame.width;
      h = a.texture.frame.height;
      n = -e * a.anchor.x;
      if (l > n && l < n + e && ((H = -h * a.anchor.y), d > H && d < H + h))
        return (b.target = a), !0;
    }
    H = a.children.length;
    for (e = 0; e < H; e++)
      if (((l = a.children[e]), this.hitTest(l, b)))
        return (b.target = l), (b.currentTarget = a), !0;
    return !1;
  };
  w.prototype.onTouchMove = function (a) {
    var b = this.interactionDOMElement.getBoundingClientRect(),
      d = a.changedTouches,
      e;
    for (e = 0; e < d.length; e++) {
      var g = d[e];
      var h = this.touchs[g.identifier];
      h.originalEvent = a || p.event;
      h.global.x = (this.target.width / b.width) * (g.clientX - b.left);
      h.global.y = (this.target.height / b.height) * (g.clientY - b.top);
      navigator.isCocoonJS &&
        ((h.global.x = g.clientX), (h.global.y = g.clientY));
    }
    a = this.interactiveItems.length;
    for (e = 0; e < a; e++)
      (b = this.interactiveItems[e]), b.touchmove && b.touchmove(h);
  };
  w.prototype.onTouchStart = function (a) {
    for (
      var b = this.interactionDOMElement.getBoundingClientRect(),
        d = a.changedTouches,
        e = 0;
      e < d.length;
      e++
    ) {
      var g = d[e],
        h = this.pool.pop();
      h || (h = new PIXI.InteractionData());
      h.originalEvent = a || p.event;
      this.touchs[g.identifier] = h;
      h.global.x = (this.target.width / b.width) * (g.clientX - b.left);
      h.global.y = (this.target.height / b.height) * (g.clientY - b.top);
      navigator.isCocoonJS &&
        ((h.global.x = g.clientX), (h.global.y = g.clientY));
      g = this.interactiveItems.length;
      for (var l = 0; l < g; l++) {
        var n = this.interactiveItems[l];
        if (
          (n.touchstart || n.tap) &&
          ((n.__hit = this.hitTest(n, h)),
          n.__hit &&
            (n.touchstart && n.touchstart(h),
            (n.__isDown = !0),
            (n.__touchData = h),
            !n.interactiveChildren))
        )
          break;
      }
    }
  };
  w.prototype.onTouchEnd = function (a) {
    for (
      var b = this.interactionDOMElement.getBoundingClientRect(),
        d = a.changedTouches,
        e = 0;
      e < d.length;
      e++
    ) {
      var g = d[e],
        h = this.touchs[g.identifier],
        l = !1;
      h.global.x = (this.target.width / b.width) * (g.clientX - b.left);
      h.global.y = (this.target.height / b.height) * (g.clientY - b.top);
      navigator.isCocoonJS &&
        ((h.global.x = g.clientX), (h.global.y = g.clientY));
      for (var n = this.interactiveItems.length, A = 0; A < n; A++) {
        var v = this.interactiveItems[A],
          E = v.__touchData;
        v.__hit = this.hitTest(v, h);
        E === h &&
          ((h.originalEvent = a || p.event),
          (v.touchend || v.tap) &&
            (v.__hit && !l
              ? (v.touchend && v.touchend(h),
                v.__isDown && v.tap && v.tap(h),
                v.interactiveChildren || (l = !0))
              : v.__isDown && v.touchendoutside && v.touchendoutside(h),
            (v.__isDown = !1)),
          (v.__touchData = null));
      }
      this.pool.push(h);
      this.touchs[g.identifier] = null;
    }
  };
  w.InteractionData = function () {
    this.global = new PIXI.Point();
    this.local = new PIXI.Point();
    this.originalEvent = this.target = this.currentTarget = null;
  };
  w.InteractionData.prototype.getLocalPosition = function (a) {
    var b = a.worldTransform;
    a = this.global;
    var d = b[0],
      e = b[1],
      g = b[2],
      h = b[3],
      l = b[4];
    b = b[5];
    var n = 1 / (d * l + e * -h);
    return new PIXI.Point(
      l * n * a.x + -e * n * a.y + (b * e - g * l) * n,
      d * n * a.y + -h * n * a.x + (-b * d + g * h) * n
    );
  };
  w.InteractionData.prototype.constructor = w.InteractionData;
  var t = {
    distance1: function (a, b, d, e) {
      a = d - a;
      b = e - b;
      return Math.sqrt(a * a + b * b);
    },
    distance2: function (a, b) {
      var d = b.x - a.x,
        e = b.y - a.y;
      return Math.sqrt(d * d + e * e);
    },
    angleRad1: function (a, b, d, e) {
      return Math.atan2(e - b, d - a);
    },
    angleDeg1: function (a, b, d, e) {
      return (Math.atan2(e - b, d - a) / Math.PI) * 180;
    },
    angleRad2: function (a, b) {
      return Math.atan2(b.y - a.y, b.x - a.x);
    },
    angleDeg2: function (a, b) {
      return (Math.atan2(b.y - a.y, b.x - a.x) / Math.PI) * 180;
    },
    vectorVelocityRad: function (a, b) {
      return { x: Math.cos(a) * b, y: Math.sin(a) * b };
    },
    vectorVelocityDeg: function (a, b) {
      var d = (a * Math.PI) / 180;
      return { x: Math.cos(d) * b, y: Math.sin(d) * b };
    },
    equal: function (a, b, d) {
      return (d = d || 1e-5), Math.abs(a - b) <= d;
    },
    toDegrees: function (a) {
      return (180 * a) / Math.PI;
    },
    toRadians: function (a) {
      return (a * Math.PI) / 180;
    },
    normAngleDeg: function (a, b) {
      return (a %= 360), (a = (a + 360) % 360), b && 180 < a && (a -= 360), a;
    },
    pointLength: function (a) {
      return Math.sqrt(a.x * a.x + a.y * a.y);
    },
    pointNormalize: function (a, b) {
      var d = t.pointLength(a);
      return 0 == d
        ? a
        : ((a.x /= d), (a.y /= d), b && ((a.x *= b), (a.y *= b)), a);
    },
    intersection: function (a, b, d, e, g) {
      if ((a.x == d.x && a.y == d.y) || (a.x == e.x && a.y == e.y))
        return null != g && g.set(a), !0;
      if ((b.x == d.x && b.y == d.y) || (b.x == e.x && b.y == e.y))
        return null != g && g.set(b), !0;
      var h = b.sub(a),
        l = e.sub(d),
        n = -h.y,
        A = h.x,
        v = -(n * a.x + A * a.y),
        E = -l.y,
        H = l.x,
        ra = -(E * d.x + H * d.y);
      l = E * a.x + H * a.y + ra;
      b = E * b.x + H * b.y + ra;
      d = n * d.x + A * d.y + v;
      e = n * e.x + A * e.y + v;
      if (0 <= l * b || 0 <= d * e) return !1;
      e = l / (l - b);
      h.x *= e;
      h.y *= e;
      a = a.add(h);
      return null != g && (g.x = a.x), null != g && (g.y = a.y), !0;
    },
  };
  aa.prototype.get = function (a) {
    return this._storage[a];
  };
  aa.prototype.set = function (a, b) {
    this._storage[a] = b.toString();
    this.localStorageEnable && localStorage.setItem(a, b.toString());
  };
  aa.prototype.read = function (a) {
    if (this.localStorageEnable)
      for (var b = a.length, d = 0; d < b; d++) {
        var e = a[d],
          g = localStorage.getItem(e);
        g && (this._storage[e] = g);
      }
  };
  aa.prototype.clear = function () {
    this._storage = {};
    localStorage.clear();
  };
  var ba = {
      generateFrameNames: function (a, b, d, e, g) {
        "undefined" == typeof e && (e = "");
        var h = [];
        if (b < d)
          for (; b <= d; b++) {
            var l =
              "number" == typeof g
                ? ba.pad(b.toString(), g, "0", 1)
                : b.toString();
            l = a + l + e;
            h.push(l);
          }
        else
          for (; b >= d; b--)
            (l =
              "number" == typeof g
                ? Phaser.Utils.pad(b.toString(), g, "0", 1)
                : b.toString()),
              (l = a + l + e),
              h.push(l);
        return h;
      },
      pad: function (a, b, d, e) {
        "undefined" == typeof b && (b = 0);
        "undefined" == typeof d && (d = " ");
        "undefined" == typeof e && (e = 3);
        if (b + 1 >= a.length)
          switch (e) {
            case 1:
              a = Array(b + 1 - a.length).join(d) + a;
              break;
            case 3:
              e = Math.ceil((b -= a.length) / 2);
              a = Array(b - e + 1).join(d) + a + Array(e + 1).join(d);
              break;
            default:
              a += Array(b + 1 - a.length).join(d);
          }
        return a;
      },
      atHome: function (a) {
        return -1 < a.indexOf(p.location.hostname);
      },
    },
    V = Box2D.Common.Math.b2Vec2,
    sa = (Box2D.Collision.b2AABB, Box2D.Dynamics.b2BodyDef),
    x = Box2D.Dynamics.b2Body,
    ta = Box2D.Dynamics.b2FixtureDef,
    va = (Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2World),
    ua =
      (Box2D.Collision.Shapes.b2MassData,
      Box2D.Collision.Shapes.b2PolygonShape),
    Aa = Box2D.Collision.Shapes.b2CircleShape,
    ma = Box2D.Dynamics.b2DebugDraw,
    oa =
      (Box2D.Dynamics.Joints.b2MouseJointDef,
      Box2D.Dynamics.Joints.b2RevoluteJointDef);
  k.prototype.constructor = k;
  k.prototype.enableDebugDraw = function () {
    this.enabledDD = !0;
    this._canvas = document.createElement("canvas");
    this._canvas.id = "PhysDebugDraw";
    this._canvas.width = c.pixi.renderer.width;
    this._canvas.height = c.pixi.renderer.height;
    this._canvas.style.zIndex = 1;
    this._canvas.style.left = 0;
    this._canvas.style.position = "absolute";
    this._canvas.style.pointerEvents = "none";
    document.body.appendChild(this._canvas);
    this._context = this._canvas.getContext("2d");
    this._context.scale(c.scale, c.scale);
    var a = new ma();
    a.SetSprite(this._context);
    a.SetDrawScale(c.physScale);
    a.SetFillAlpha(0.3);
    a.SetLineThickness(1);
    a.SetFlags(ma.e_shapeBit | ma.e_jointBit);
    this.world.SetDebugDraw(a);
  };
  k.prototype.updateCanvasSize = function () {
    this.enabledDD &&
      ((this._canvas.width = c.pixi.renderer.width),
      (this._canvas.height = c.pixi.renderer.height),
      (this._canvas.style.width = c.pixi.view.style.width),
      (this._canvas.style.height = c.pixi.view.style.height),
      this._context.scale(c.scale, c.scale));
  };
  k.prototype.doIt = function (a) {
    return this.world.IsLocked() ? (this._doIt.push(a), !1) : (a.call(), !0);
  };
  k.prototype.doItAll = function () {
    for (var a = this._doIt.length, b = 0; b < a; b++) this._doIt[b].call();
    this.clearDoIt();
  };
  k.prototype.clearDoIt = function () {
    this._doIt = [];
  };
  k.prototype._update = function () {
    this.world.Step(1 / 60, 10, 10);
    this.enabledDD && this.world.DrawDebugData();
    this.world.ClearForces();
    0 < this._doIt.length && this.doItAll();
  };
  k.prototype._createGround = function () {
    var a = new ta();
    a.density = 1;
    a.friction = 0.5;
    a.restitution = 0.2;
    var b = new sa();
    b.type = x.b2_staticBody;
    a.shape = new ua();
    a.shape.SetAsBox((c.gameWidth0 / 2 - 4) / c.physScale, 10 / c.physScale);
    b.position.Set(c.gameWidth0 / 2 / c.physScale, c.gameHeight0 / c.physScale);
    this.world.CreateBody(b).CreateFixture(a);
  };
  k.createCircleShape = function (a, b) {
    var d = new Aa(a / c.physScale);
    return b && d.SetLocalPosition(b), d;
  };
  k.createPolygonShape = function (a, b, d, e, g) {
    d = d || 0;
    e = e || 0;
    g = g || 0;
    var h = new ua();
    return (
      0 == d && 0 == e && 0 == g
        ? h.SetAsBox(a / 2 / c.physScale, b / 2 / c.physScale)
        : h.SetAsOrientedBox(
            a / 2 / c.physScale,
            b / 2 / c.physScale,
            new V(d / c.physScale, e / c.physScale),
            g
          ),
      h
    );
  };
  k.createFixtureDef = function (a, b, d, e, g, h, l) {
    var n = new ta();
    return (
      (g = g || null),
      (h = h || !1),
      (l = l || null),
      (n.shape = a),
      (n.friction = b),
      (n.restitution = d),
      (n.density = e),
      (n.isSensor = h),
      (n.userData = g),
      l && (n.filter = l),
      n
    );
  };
  k.createBodyDef = function (a, b, d, e, g, h, l) {
    var n = new sa();
    return (
      (e = e || !1),
      (g = g || !0),
      (h = h || 0),
      (l = l || !1),
      (n.type = d),
      n.position.Set(a / c.physScale, b / c.physScale),
      (n.angle = h),
      (n.active = g),
      (n.bullet = l),
      (n.fixedRotation = e),
      n
    );
  };
  k.createBody = function (a, b) {
    var d = c.physWorld.CreateBody(a);
    if (b) for (var e = b.length, g = 0; g < e; g++) d.CreateFixture(b[g]);
    return d;
  };
  k.hasContactPairOfProperties = function (a, b, d) {
    var e = a.GetFixtureA();
    a = a.GetFixtureB();
    if (null == e || null == a) return !1;
    e = e.GetUserData();
    var g = a.GetUserData();
    if (null == e || null == g) return !1;
    a = e.hasOwnProperty(b) && g.hasOwnProperty(d);
    b = e.hasOwnProperty(d) && g.hasOwnProperty(b);
    return a || b;
  };
  k.getAnotherOfContact = function (a, b) {
    var d = a.GetFixtureA(),
      e = a.GetFixtureB();
    if (null == d && null == e) return null;
    d = d ? d.GetUserData() : null;
    e = e ? e.GetUserData() : null;
    if (null == d && null == e) return null;
    d = null != d ? d.item : null;
    e = null != e ? e.item : null;
    return null == d && null == e ? null : d == b ? e : e == b ? d : null;
  };
  na.prototype = {
    rnd: function () {
      var a = 2091639 * this.s0 + 2.3283064365386963e-10 * this.c;
      return (
        (this.c = 0 | a),
        (this.s0 = this.s1),
        (this.s1 = this.s2),
        (this.s2 = a - this.c),
        this.s2
      );
    },
    sow: function (a) {
      "undefined" == typeof a && (a = []);
      this.s0 = this.hash(" ");
      this.s1 = this.hash(this.s0);
      this.s2 = this.hash(this.s1);
      this.c = 1;
      for (var b, d = 0; (b = a[d++]); )
        (this.s0 -= this.hash(b)),
          (this.s0 += ~~(0 > this.s0)),
          (this.s1 -= this.hash(b)),
          (this.s1 += ~~(0 > this.s1)),
          (this.s2 -= this.hash(b)),
          (this.s2 += ~~(0 > this.s2));
    },
    hash: function (a) {
      var b;
      var d = 4022871197;
      a = a.toString();
      for (b = 0; b < a.length; b++) {
        d += a.charCodeAt(b);
        var e = 0.02519603282416938 * d;
        d = e >>> 0;
        e -= d;
        e *= d;
        d = e >>> 0;
        e -= d;
        d += 4294967296 * e;
      }
      return 2.3283064365386963e-10 * (d >>> 0);
    },
    integer: function () {
      return 4294967296 * this.rnd.apply(this);
    },
    frac: function () {
      return (
        this.rnd.apply(this) +
        1.1102230246251565e-16 * ((2097152 * this.rnd.apply(this)) | 0)
      );
    },
    real: function () {
      return this.integer() + this.frac();
    },
    integerInRange: function (a, b) {
      return Math.round(this.realInRange(a, b));
    },
    realInRange: function (a, b) {
      return this.frac() * (b - a) + a;
    },
    normal: function () {
      return 1 - 2 * this.frac();
    },
    uuid: function () {
      var a, b;
      for (
        b = a = "";
        36 > a++;
        b +=
          ~a % 5 | ((3 * a) & 4)
            ? (15 ^ a ? 8 ^ (this.frac() * (20 ^ a ? 16 : 4)) : 4).toString(16)
            : "-"
      );
      return b;
    },
    pick: function (a) {
      return a[this.integerInRange(0, a.length - 1)];
    },
    weightedPick: function (a) {
      return a[~~(Math.pow(this.frac(), 2) * a.length)];
    },
    timestamp: function (a, b) {
      return this.realInRange(a || 9466848e5, b || 1577862e6);
    },
  };
  W.prototype = Object.create(PIXI.Container.prototype);
  W.prototype.constructor = W;
  W.prototype.show = function () {
    this.shown = !0;
    TweenMax.to(this, 0.5, {
      x: this.showX,
      y: this.showY,
      ease: Expo.easeOut,
    });
  };
  W.prototype.hide = function () {
    this.shown = !1;
    TweenMax.to(this, 0.5, {
      x: this.hideX,
      y: this.hideY,
      ease: Expo.easeOut,
    });
  };
  X.prototype = Object.create(PIXI.Container.prototype);
  X.prototype.constructor = X;
  X.prototype.show = function (a) {
    a = a || 0;
    this.visible = !0;
    var b = this;
    TweenMax.to(this, 0.4, { delay: a, alpha: 1 });
    TweenMax.to(this._text.scale, 0.8, {
      delay: (a += 0.1),
      x: 1,
      y: 1,
      ease: Elastic.easeOut,
      onStart: function () {
        c.soundOn && b.sndWin.play();
      },
    });
    var d = Quad.easeOut,
      e = this._btnMenu.xIn,
      g = this._btnMenu.yIn;
    TweenMax.to(this._btnMenu, 0.4, { delay: (a += 0.1), x: e, y: g, ease: d });
    e = this._btnRestart.xIn;
    g = this._btnRestart.yIn;
    TweenMax.to(this._btnRestart, 0.4, {
      delay: (a += 0.05),
      x: e,
      y: g,
      ease: d,
    });
    this._btnNext.enable = c.levelMng.currLevel != c.levelMng.totalLevels;
    e = this._btnNext.xIn;
    g = this._btnNext.yIn;
    TweenMax.to(this._btnNext, 0.4, {
      delay: (a += 0.05),
      x: e,
      y: g,
      ease: d,
    });
  };
  X.prototype.hide = function () {
    this.visible = !1;
    this.alpha = 0;
    this._btnRestart.x = this._btnRestart.xOut;
    this._btnRestart.y = this._btnRestart.yOut;
    this._btnMenu.x = this._btnMenu.xOut;
    this._btnMenu.y = this._btnMenu.yOut;
    this._btnNext.x = this._btnNext.xOut;
    this._btnNext.y = this._btnNext.yOut;
    this._text.scale.set(0, 0);
  };
  I.prototype = Object.create(PIXI.Container.prototype);
  I.prototype.constructor = I;
  I.prototype.show = function () {
    this.shown = !0;
    TweenMax.to(this, 0.5, {
      x: this.showX,
      y: this.showY,
      ease: Expo.easeOut,
    });
  };
  I.prototype.hide = function () {
    this.shown = !1;
    TweenMax.to(this, 0.5, {
      x: this.hideX,
      y: this.hideY,
      ease: Expo.easeOut,
    });
  };
  I.prototype._onClick = function (a) {
    this._buttonsHandler(a.target.num);
  };
  I.prototype.refresh = function () {
    for (var a = this._buttons.length, b = 0; b < a; b++)
      this._buttons[b].setLocked(b + 1 > c.levelMng.lastOpened);
  };
  u.prototype = Object.create(m.prototype);
  u.prototype.constructor = u;
  u.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    u._balls.remove(this);
  };
  u.prototype.setVelocity = function (a) {
    a = new V(a.x / c.physScale, a.y / c.physScale);
    this._body.SetLinearVelocity(a);
    this._body.SetAngularVelocity(a.x / 10 + 0.4);
    this._body.SetAwake(!0);
  };
  u.prototype._update = function () {
    m.prototype._update.call(this);
    this.y > c.gameHeight0 + 50 && this.destroy();
  };
  u._balls = new D("Balls");
  u._maxBalls = 25;
  u.create = function (a, b, d) {
    if (u._balls.total() >= u._maxBalls) {
      var e = u._balls.first();
      e.destroy();
      u._balls.remove(e);
    }
    a = new u(a, b);
    return d.addChild(a), u._balls.add(a), a;
  };
  O.prototype = Object.create(m.prototype);
  O.prototype.constructor = O;
  O.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    c.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  O.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof u && this._ballInTheNet();
  };
  O.prototype._ballInTheNet = function () {
    c.playState.complete();
  };
  B.prototype = Object.create(m.prototype);
  B.prototype.constructor = B;
  B.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    c.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    m.events.off(m.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
    this.sndStart && this.sndStart.stop();
    this._rails.destroy(!0);
  };
  B.prototype._createRails = function () {
    this._rails = new PIXI.Container();
    this._rails.x = this.x;
    this._rails.y = this.y;
    this._rails.zOrder = q.zOrder.rail;
    c.playState.gameLayer.addChild(this._rails);
    this._endX = this.x;
    this._endY = this.y;
    "v" == this._orienation
      ? ((this._endY = this._end), (this._rails.y = this.y - 22))
      : ((this._endX = this._end), (this._rails.y = this.y - 22));
    var a = t.distance1(this.x, this.y, this._endX, this._endY);
    var b = c.assets.getSprite("rail", "atlasGame").width / 2;
    b = Math.ceil(a / b);
    console.log(b);
    for (var d = 0; d < b; d++) {
      var e = c.assets.getSprite("rail", "atlasGame");
      e.scale.set(0.5, 0.5);
      e.anchor.set(0, 0.5);
      e.x = (e.width - 1) * d;
      this._rails.addChild(e);
    }
    "v" == this._orienation
      ? ((this._rails.rotation = t.toRadians(90)),
        this.y > this._endY && (this._rails.y -= a))
      : this.x > this._endX && (this._rails.x -= a);
  };
  B.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof u && this._ballInTheNet();
  };
  B.prototype._ballInTheNet = function () {
    c.playState.complete();
  };
  B.prototype._onTriggerEvent = function (a) {
    this.id == a.id && this._move();
  };
  B.prototype._move = function () {
    this._isMove ||
      ((this._isMove = !0),
      this._defDirection(),
      this._enableUpdate(),
      (this.angleUpdate = !0),
      (this.positionUpdate = !0),
      c.soundOn && this.sndStart.play());
  };
  B.prototype._defDirection = function () {
    this._isUsed ||
      ((this._isUsed = !0),
      (this._speed = 2),
      (this._vel = new V()),
      (this._stopVal = 0),
      "v" == this._orienation
        ? ((this._vel.y = this._speed * (this.y > this._endY ? -1 : 1)),
          (this._stopVal = this._endY),
          this.y > this._endY && (this._rails.y -= length))
        : ((this._vel.x = this._speed * (this.x > this._endX ? -1 : 1)),
          (this._stopVal = this._endX)),
      this._body.SetAwake(!0),
      this._body.GetLinearVelocity().Set(this._vel.x, this._vel.y));
  };
  B.prototype._update = function () {
    m.prototype._update.call(this);
    this._isMove &&
      ("v" == this._orienation
        ? t.equal(this.y, this._stopVal, 3) && this._stop()
        : t.equal(this.x, this._stopVal, 3) && this._stop());
  };
  B.prototype._stop = function () {
    this._isMove = !1;
    this._body.GetLinearVelocity().SetZero();
    c.soundOn && (this.sndStart.stop(), this.sndStop.play());
  };
  F.prototype = Object.create(m.prototype);
  F.prototype.constructor = F;
  F.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    c.playState.bg.off("pointerdown", this._pointerDown, this);
    c.playState.bg.off("pointerup", this._pointerUp, this);
  };
  F.prototype._shot = function (a) {
    this._cannon.playing ||
      ((this._shoted = !1),
      this._cannon.gotoAndStop(0),
      this._cannon.play(),
      c.soundOn && this.sndShot.play());
  };
  F.prototype._pointerDown = function (a) {
    this._isAllowMove = !0;
    c.playState.aim.visible = !0;
  };
  F.prototype._pointerUp = function (a) {
    this._isAllowMove = !1;
    c.playState.blinkBtnFire();
  };
  F.prototype._frameChanged = function (a) {
    if (8 <= a && !this._shoted) {
      this._shoted = !0;
      this._cannon.toLocal(this._ballSpawnPoint, this, this._helperPoint);
      this._helperPoint.x *= -1;
      if (c.playState.aimControl) {
        var b = c.playState.aim.position.x;
        var d = c.playState.aim.position.y;
      } else
        (a = c.pixi.renderer.plugins.interaction.pointer.global),
          (b = a.x / c.scale),
          (d = a.y / c.scale);
      a = this._helperPoint.x + this.x;
      var e = this._helperPoint.y + this.y;
      b = t.distance1(a, e, b, d) / this.shotScale;
      1 < b && (b = 1);
      d = { x: this.x - a, y: this.y - e };
      d = t.pointNormalize(
        d,
        -(b * (this.maxPower - this.minPower) + this.minPower)
      );
      u.create(a, e, c.playState.ballLayer).setVelocity(d);
    }
  };
  F.prototype._shotComplete = function (a) {
    this._cannon.gotoAndStop(0);
  };
  F.prototype._update = function (a) {
    this._isAllowMove &&
      ((a = c.pixi.renderer.plugins.interaction.pointer.global),
      (a = { x: a.x / c.scale, y: a.y / c.scale }),
      c.playState.aimControl &&
        ((a.y -= 50), c.playState.aim.position.set(a.x, a.y)),
      this._helperPoint.set(this.x, this.y),
      (a = t.angleDeg2(a, this._helperPoint) - 90),
      (a = t.normAngleDeg(a, !0)),
      a < this.lowerAngle
        ? (a = this.lowerAngle)
        : a > this.upperAngle && (a = this.upperAngle),
      (this._cannon.rotation = t.toRadians(a)));
  };
  ca.prototype = Object.create(m.prototype);
  ca.prototype.constructor = ca;
  J.prototype = Object.create(m.prototype);
  J.prototype.constructor = J;
  J.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    m.events.off(m.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  };
  J.prototype._onTriggerEvent = function (a) {
    this.id != a.id ||
      this.opened ||
      ((this.opened = !0),
      "left" == this.direction
        ? (this._body.SetAwake(!0),
          this._body.SetAngularVelocity(2 * (this.inversed ? -1 : 1)))
        : "right" == this.direction &&
          (this._body.SetAwake(!0),
          this._body.SetAngularVelocity(-2 * (this.inversed ? -1 : 1))),
      this._enableUpdate(),
      (this.positionUpdate = this.angleUpdate = !0),
      c.soundOn && this.sndGate.play());
  };
  J.prototype._stop = function () {
    this._body.SetAngularVelocity(0);
    this._disableUpdate();
    this.positionUpdate = this.angleUpdate = !1;
  };
  J.prototype._update = function () {
    m.prototype._update.call(this);
    this.inversed
      ? (("left" == this.direction &&
          this._body.GetAngle() <= this.openAngle) ||
          ("right" == this.direction &&
            this._body.GetAngle() >= -this.openAngle)) &&
        this._stop()
      : (("left" == this.direction &&
          this._body.GetAngle() >= this.openAngle) ||
          ("right" == this.direction &&
            this._body.GetAngle() <= -this.openAngle)) &&
        this._stop();
  };
  da.prototype = Object.create(m.prototype);
  da.prototype.constructor = da;
  K.prototype = Object.create(m.prototype);
  K.prototype.constructor = K;
  K.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    c.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  K.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof u && this.unhook();
  };
  K.prototype._update = function () {
    m.prototype._update.call(this);
    this.y > c.gameHeight0 + 50 && this.destroy();
  };
  K.prototype.unhook = function () {
    c.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    this._body.SetType(x.b2_dynamicBody);
    this._body.SetAwake(!0);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
    c.soundOn && this.sndPeg.play();
  };
  fa.prototype = Object.create(m.prototype);
  fa.prototype.constructor = fa;
  Y.prototype = Object.create(m.prototype);
  Y.prototype.constructor = Y;
  Y.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    c.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  Y.prototype._onBeginContact = function (a) {
    a = k.getAnotherOfContact(a, this);
    (a instanceof u || a instanceof ca || a instanceof da) &&
      (this.btn.play(),
      m.events.emit(m.EVENT_TRIGGER_PRESSED, { id: this.id }));
  };
  ha.prototype = Object.create(m.prototype);
  ha.prototype.constructor = ha;
  ia.prototype = Object.create(m.prototype);
  ia.prototype.constructor = ia;
  L.prototype = Object.create(m.prototype);
  L.prototype.constructor = L;
  L.prototype.destroy = function () {
    m.prototype.destroy.call(this);
    c.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    c.physics.contactListener.removeEndContactListener(
      this._onEndContact,
      this
    );
    m.events.off(m.EVENT_TELEPORTATION, this._teleportation, this);
  };
  L.prototype._onBeginContact = function (a) {
    this._inUse ||
      ((a = k.getAnotherOfContact(a, this)),
      a instanceof u &&
        m.events.emit(m.EVENT_TELEPORTATION, {
          sender: this,
          ball: a,
          id: this.id,
        }));
  };
  L.prototype._onEndContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof u && (_inUse = !1);
  };
  L.prototype._teleportation = function (a) {
    var b = a.ball,
      d = a.id;
    if (a.sender != this && d == this.id) {
      this._inUse = !0;
      var e = this;
      c.physics.doIt(function () {
        b.setPosition(e.x, e.y);
      });
      c.soundOn && this.sndTeleport.play();
    }
  };
  P.prototype = Object.create(m.prototype);
  P.prototype.constructor = P;
  P.prototype.suck = function () {
    for (var a = this._body.GetContactList(); null != a; ) {
      var b = a.contact;
      b.IsEnabled() &&
        b.IsTouching() &&
        ((b = k.getAnotherOfContact(b, this)),
        b instanceof u && this.suckIt(b._body));
      a = a.next;
    }
  };
  P.prototype.suckIt = function (a) {
    a.GetLinearVelocity().SetZero();
    a.ApplyForce(this._force, a.GetPosition());
  };
  P.prototype._update = function () {
    m.prototype._update.call(this);
    this.suck();
  };
  ja.prototype = Object.create(m.prototype);
  ja.prototype.constructor = ja;
  ea.prototype = Object.create(m.prototype);
  ea.prototype.constructor = ea;
  ea.prototype._update = function () {
    m.prototype._update.call(this);
    this.y > c.gameHeight0 + 100 && this.destroy();
  };
  Q.prototype = Object.create(PIXI.Container.prototype);
  Q.prototype.constructor = Q;
  Q.prototype._onClick = function (a) {
    switch (a.target.name) {
      case "Play":
        this._levelsDialog.shown
          ? this._levelsDialog.hide()
          : this._levelsDialog.show();
        try {
          parent.cmgGameEvent("start");
        } catch (b) {}
        break;
      case "Credits":
        this._creditsDialog.shown
          ? this._creditsDialog.hide()
          : this._creditsDialog.show();
        break;
      case "Music":
        c.setMusicEnable(a.isOn);
        break;
      case "Sound":
        c.setSoundEnable(a.isOn);
    }
    c.soundOn && this.sndButton.play();
  };
  Q.prototype._onBtnsLevelClick = function (a) {
    c.levelMng.currLevel = a;
    c.shutter.run(function () {
      this.destroy({ children: !0 });
      c.menuState = null;
      new q();
    }, this);
    c.soundOn && this.sndButton.play();
    try {
      parent.cmgGameEvent("start", a);
    } catch (b) {}
  };
  q.prototype = Object.create(PIXI.Container.prototype);
  q.prototype.constructor = q;
  q.prototype.destroy = function (a) {
    PIXI.Container.prototype.destroy.call(this, a);
  };
  q.prototype._onStageClick = function (a) {
    this._isComplete || this.shotHandler.call(a);
  };
  q.prototype._onGameLayerChildAdded = function () {
    this.updateLayersOrder();
  };
  q.prototype.updateLayersOrder = function () {
    this.gameLayer.children.sort(function (a, b) {
      return (
        (a.zOrder = a.zOrder || 0),
        (b.zOrder = b.zOrder || 0),
        a.zOrder != b.zOrder ? a.zOrder - b.zOrder : a.y - b.y
      );
    });
  };
  q.prototype.complete = function () {
    this._isComplete ||
      ((this._isComplete = !0),
      this._levelComplete.show(0.5),
      c.levelMng.onLevelComplete());
  };
  q.zOrder = {
    defaultZ: 100,
    cannon: 100,
    ball: 50,
    basket: 100,
    platform: 150,
    pushButton: 40,
    teleport: 41,
    rail: 30,
  };
  q.prototype._createUI = function () {
    var a = r.generateButton("btnMenuGame", "atlasUI", this._onBtnsClick, this);
    a.name = "Menu";
    a.scale.set(0.5, 0.5);
    a.anchor.set(1, 1);
    a.x = c.gameWidth0 - 5;
    a.y = c.gameHeight0 - 5;
    this.uiLayer.addChild(a);
    var b = r.generateButton(
      "btnRestartGame",
      "atlasUI",
      this._onBtnsClick,
      this
    );
    if (
      ((b.name = "Restart"),
      b.scale.set(0.5, 0.5),
      b.anchor.set(1, 1),
      (b.x = a.x - a.width - 5),
      (b.y = a.y),
      this.uiLayer.addChild(b),
      this.aimControl)
    )
      (a = r.generateButton("btnFire", "atlasUI", this._onBtnsClick, this)),
        (a.name = "Fire"),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0, 1),
        (a.x = 3.5),
        (a.y = c.gameHeight0 - 3.5),
        this.uiLayer.addChild(a),
        (this._btnFireBlinked = !1),
        (this._blinker = c.assets.getSprite("btnFireBlink")),
        this._blinker.scale.set(0.5, 0.5),
        this._blinker.anchor.set(0, 1),
        (this._blinker.x = a.x - 3.5),
        (this._blinker.y = a.y + 3.5),
        (this._blinker.visible = !1),
        this.addChild(this._blinker);
    a = new PIXI.TextStyle({
      fontFamily: "Impact",
      fontSize: 48,
      fill: "black",
      stroke: "white",
      strokeThickness: 3,
    });
    this._txtLevel = new PIXI.Text("Level: " + c.levelMng.currLevel, a);
    this._txtLevel.x = 5;
    this._txtLevel.y = 5;
    this._txtLevel.scale.set(0.5, 0.5);
    this.uiLayer.addChild(this._txtLevel);
  };
  q.prototype.blinkBtnFire = function () {
    this._btnFireBlinked ||
      ((this._btnFireBlinked = !0),
      (this._blinker.visible = !0),
      (this._blinker.alpha = 0),
      (this._blinkTween = TweenMax.to(this._blinker, 0.5, {
        alpha: 1,
        repeat: -1,
        yoyo: !0,
      })));
  };
  q.prototype.stopBlinkBtnFire = function () {
    this._blinkTween &&
      ((this._blinker.visible = !1),
      this._blinkTween.kill(),
      (this._blinkTween = null));
  };
  q.prototype._onBtnsClick = function (a) {
    switch (a.target.name) {
      case "Menu":
        c.shutter.run(function () {
          this.destroy({ children: !0 });
          c.playState = null;
          new Q();
        }, this);
        break;
      case "Restart":
        c.shutter.run(function () {
          try {
            parent.cmgGameEvent("replay", c.levelMng.currLevel);
          } catch (b) {}
          this.destroy({ children: !0 });
          c.playState = null;
          new q();
        }, this);
        break;
      case "Next":
        c.shutter.run(function () {
          c.levelMng.currLevel++;
          try {
            parent.cmgGameEvent("start", c.levelMng.currLevel);
          } catch (b) {}
          this.destroy({ children: !0 });
          c.playState = null;
          new q();
        }, this);
        break;
      case "Fire":
        if (this._isComplete) return;
        this.shotHandler.call(a);
        this.stopBlinkBtnFire();
    }
    c.soundOn && this.sndButton.play();
  };
  R.prototype.constructor = R;
  R.prototype.create = function (a) {
    a = a || this.currLevel;
    1 > a ? (a = 1) : a > this.totalLevels && (a = this.totalLevels);
    this.currLevel = a;
    a--;
    a = pa[a].items;
    for (var b = a.length, d = 0; d < b; d++) this._createItem(a[d]);
  };
  R.prototype.onLevelComplete = function () {
    this.currLevel == this.lastOpened &&
      (this.lastOpened++,
      c.storage.set(c.SAVE_KEY_LAST_OPENED, this.lastOpened));
  };
  R.prototype._createItem = function (a) {
    if ("Cannon" == a.name) {
      var b = new F(a.x, a.y);
      b.lowerAngle = void 0 != a.lowerAngle ? a.lowerAngle : -45;
      b.upperAngle = void 0 != a.upperAngle ? a.upperAngle : 45;
      c.playState.gameLayer.addChild(b);
    } else
      "Basket" == a.name
        ? ((a = new O(a.x, a.y)), c.playState.gameLayer.addChild(a))
        : "Ball" == a.name
        ? ((a = new u(a.x, a.y)), c.playState.gameLayer.addChild(a))
        : "Platform" == a.name
        ? ((a = new fa(a.x, a.y, a.width, a.angle)),
          c.playState.gameLayer.addChild(a))
        : "Peg" == a.name
        ? ((a = new K(a.x, a.y)), c.playState.gameLayer.addChild(a))
        : "Hammer" == a.name
        ? ((a = new da(a.x, a.y, a.angle, a.hmDensity)),
          c.playState.gameLayer.addChild(a))
        : "WeightBall" == a.name
        ? ((a = new ea(a.x, a.y, a.wbDensity)),
          c.playState.gameLayer.addChild(a))
        : "Stopper" == a.name
        ? ((a = new ha(a.x, a.y)), c.playState.gameLayer.addChild(a))
        : "Swings" == a.name
        ? ((a = new ia(a.x, a.y, a.angle)), c.playState.gameLayer.addChild(a))
        : "PushButton" == a.name
        ? ((a = new Y(a.x, a.y, a.btnID, a.angle)),
          c.playState.gameLayer.addChild(a))
        : "Gate" == a.name
        ? ((a = new J(
            a.x,
            a.y,
            a.direction,
            a.gateLeftID || a.gateRightID,
            a.openAngle,
            a.inversed || !1
          )),
          c.playState.gameLayer.addChild(a))
        : "Teleport" == a.name
        ? ((a = new L(a.x, a.y, a.teleportID, a.angle)),
          c.playState.gameLayer.addChild(a))
        : "Domino" == a.name
        ? ((a = new ca(a.x, a.y)), c.playState.gameLayer.addChild(a))
        : "Tube" == a.name
        ? ((a = new P(a.x, a.y, a.angle, a.plusSensorFront, a.plusSensorBack)),
          c.playState.gameLayer.addChild(a))
        : "BasketRail" == a.name &&
          ((a = new B(a.x, a.y, a.orientation, a.end, a.basketID)),
          c.playState.gameLayer.addChild(a));
  };
  R.prototype.unlockAllLevels = function () {
    this.lastOpened = this.totalLevels;
  };
  var pa = [
    {
      items: [
        { name: "Platform", x: 428, y: 255.5, width: 21.1, angle: -90 },
        { name: "Basket", x: 500, y: 304 },
        { name: "Cannon", x: 160, y: 320.75 },
        { name: "Platform", x: 600, y: 247, width: 54, angle: -90 },
        { name: "Platform", x: 639.05, y: 215.4, width: 92.3, angle: -15 },
        { name: "Platform", x: 678.1, y: 55.1, width: 311, angle: -90 },
        { name: "Platform", x: 160.05, y: 328.15, width: 60, angle: 0 },
        { name: "Platform", x: 567.45, y: 277.1, width: 78.5, angle: -15 },
        { name: "Platform", x: 447.45, y: 281.6, width: 60.6, angle: 45 },
      ],
    },
    {
      items: [
        { name: "Basket", x: 350, y: 345 },
        { name: "Ball", x: 455, y: 145 },
        { name: "Hammer", x: 500, y: 80, angle: -45 },
        { name: "Peg", x: 570, y: 92 },
        { name: "Cannon", x: 500, y: 403, lowerAngle: 0, upperAngle: 30 },
        { name: "Platform", x: 496.35, y: 410, width: 97.3, angle: 0 },
        { name: "Platform", x: 455, y: 280, width: 250, angle: -90 },
        { name: "Platform", x: 79.05, y: 193.05, width: 100, angle: 60 },
        { name: "Platform", x: 145.05, y: 259.95, width: 100, angle: 30 },
        { name: "Platform", x: 235.05, y: 293.95, width: 100, angle: 10 },
        { name: "Platform", x: 409.45, y: 189.85, width: 100, angle: -35 },
        { name: "Platform", x: 371.7, y: 244.35, width: 64, angle: -90 },
        { name: "Platform", x: 411.5, y: 268.85, width: 65, angle: 0 },
      ],
    },
    {
      items: [
        { name: "Basket", x: 540, y: 421 },
        { name: "WeightBall", x: 500, y: 165 },
        { name: "Platform", x: 580, y: 373.25, width: 286.9, angle: -90 },
        { name: "Platform", x: 500, y: 375.7, width: 286.1, angle: -90 },
        { name: "Platform", x: 500, y: 42.55, width: 133, angle: -90 },
        { name: "Cannon", x: 140, y: 400 },
        { name: "Platform", x: 140, y: 408, width: 60, angle: 0 },
        { name: "Peg", x: 475, y: 221.45 },
        { name: "Peg", x: 525, y: 221.45 },
        { name: "Platform", x: 560, y: 328.35, width: 50, angle: -45 },
        { name: "Platform", x: 140, y: 427, width: 23, angle: 90 },
        { name: "Platform", x: 520, y: 278.35, width: 50, angle: 45 },
        { name: "Platform", x: 623.6, y: 209.25, width: 109.2, angle: -30 },
        { name: "Platform", x: 667.25, y: 108.45, width: 160.8, angle: -90 },
      ],
    },
    {
      items: [
        { name: "Platform", x: 76.25, y: 114.75, width: 98.6, angle: -90 },
        { name: "Platform", x: 208.75, y: 121.65, width: 84.3, angle: -90 },
        { name: "Swings", x: 142.5, y: 130, angle: 10 },
        {
          name: "Gate",
          x: 600,
          y: 95,
          direction: "left",
          gateLeftID: 1,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 660,
          y: 95,
          direction: "right",
          gateRightID: 1,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 600,
          y: 130,
          direction: "left",
          gateLeftID: 2,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 660,
          y: 130,
          direction: "right",
          gateRightID: 2,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 600,
          y: 165,
          direction: "left",
          gateLeftID: 3,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 660,
          y: 165,
          direction: "right",
          gateRightID: 3,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 600,
          y: 200,
          direction: "left",
          gateLeftID: 4,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 660,
          y: 200,
          direction: "right",
          gateRightID: 4,
          openAngle: 45,
        },
        { name: "Basket", x: 630, y: 250 },
        { name: "PushButton", x: 241.85, y: 350.5, angle: 0, btnID: 4 },
        { name: "PushButton", x: 175.6, y: 350.5, angle: 0, btnID: 3 },
        { name: "PushButton", x: 109.35, y: 350.5, angle: 0, btnID: 2 },
        { name: "PushButton", x: 43.1, y: 350.5, angle: 0, btnID: 1 },
        { name: "Cannon", x: 450, y: 400 },
        { name: "Platform", x: 224.75, y: 76.95, width: 117.7, angle: -14 },
        { name: "Platform", x: 580, y: 180, width: 200, angle: -90 },
        { name: "Platform", x: 680, y: 180, width: 200, angle: -90 },
        { name: "Platform", x: 275, y: 210, width: 280, angle: -90 },
        { name: "Platform", x: 142.5, y: 357.5, width: 280, angle: 0 },
        { name: "Platform", x: 10, y: 210, width: 280, angle: -90 },
        { name: "Platform", x: 69.6, y: 62.5, width: 134.2, angle: 0 },
        { name: "Platform", x: 142.5, y: 250, width: 200, angle: -90 },
        { name: "Platform", x: 76.25, y: 300, width: 100, angle: -90 },
        { name: "Platform", x: 208.75, y: 300, width: 100, angle: -90 },
        { name: "Stopper", x: 127.5, y: 155 },
        { name: "Stopper", x: 157.5, y: 155 },
        { name: "Platform", x: 450, y: 408.15, width: 60, angle: 0 },
        { name: "Swings", x: 76, y: 232.5, angle: 10 },
        { name: "Stopper", x: 61, y: 258.5 },
        { name: "Stopper", x: 91, y: 258.5 },
        { name: "Swings", x: 209, y: 232.5, angle: 10 },
        { name: "Stopper", x: 194, y: 258.5 },
        { name: "Stopper", x: 224, y: 258.5 },
        { name: "Platform", x: 239.4, y: -112.25, width: 308.8, angle: -90 },
        { name: "Platform", x: 191.6, y: 48.35, width: 110.3, angle: -14 },
        { name: "Platform", x: 142.5, y: 67.15, width: 24.8, angle: -90 },
      ],
    },
    {
      items: [
        { name: "Cannon", x: 360.6, y: 411.85, lowerAngle: -45, upperAngle: 0 },
        { name: "Basket", x: 480, y: 360 },
        {
          name: "Gate",
          x: 450,
          y: 320,
          direction: "left",
          gateLeftID: 1,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 510,
          y: 320,
          direction: "right",
          gateRightID: 1,
          openAngle: 45,
        },
        { name: "PushButton", x: 259.25, y: 189.35, angle: 105, btnID: 1 },
        { name: "Teleport", x: 65, y: 370, angle: 0, teleportID: 1 },
        { name: "Platform", x: 122.65, y: 349.35, width: 45.1, angle: -15 },
        { name: "Platform", x: 168.7, y: 329.05, width: 64.5, angle: -30 },
        { name: "Platform", x: 216.35, y: 274.95, width: 99.4, angle: -60 },
        { name: "Platform", x: 252.45, y: 187.2, width: 99.4, angle: -75 },
        { name: "Platform", x: 410, y: 240, width: 420, angle: -90 },
        { name: "Platform", x: 580.7, y: 286.15, width: 110.1, angle: -30 },
        { name: "Platform", x: 651.45, y: 234.05, width: 76.8, angle: -45 },
        { name: "Teleport", x: 650, y: 180, angle: 180, teleportID: 1 },
        { name: "Platform", x: 360, y: 418.15, width: 60, angle: 0 },
      ],
    },
    {
      items: [
        { name: "PushButton", x: 198.05, y: 453, angle: 0, btnID: 1 },
        { name: "Cannon", x: 360.6, y: 351.85 },
        { name: "Basket", x: 660, y: 140 },
        { name: "Platform", x: 432.3, y: 460, width: 394.3, angle: 0 },
        { name: "Platform", x: 369.45, y: 359, width: 439.1, angle: 0 },
        { name: "Platform", x: 682, y: 360, width: 56, angle: 0 },
        { name: "Platform", x: 668.8, y: 418.35, width: 128.9, angle: -45 },
        { name: "Platform", x: 617.25, y: 377.65, width: 79.8, angle: 30 },
        { name: "Domino", x: 580, y: 425 },
        { name: "Domino", x: 550, y: 425 },
        { name: "Domino", x: 520, y: 425 },
        { name: "Domino", x: 490, y: 425 },
        { name: "Domino", x: 460, y: 425 },
        { name: "Domino", x: 430, y: 425 },
        { name: "Domino", x: 400, y: 425 },
        { name: "Domino", x: 370, y: 425 },
        { name: "Domino", x: 340, y: 425 },
        { name: "Domino", x: 310, y: 425 },
        { name: "Domino", x: 280, y: 425 },
        { name: "Domino", x: 250, y: 425 },
        { name: "Platform", x: 197.95, y: 460, width: 40.2, angle: 0 },
        { name: "Platform", x: 666.3, y: 42.55, width: 82.7, angle: 0 },
        { name: "Platform", x: 620, y: 141.05, width: 122, angle: -90 },
        { name: "Platform", x: 700, y: 95, width: 90, angle: -90 },
        {
          name: "Gate",
          x: 30,
          y: 330,
          direction: "left",
          gateLeftID: 1,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 90,
          y: 330,
          direction: "right",
          gateRightID: 1,
          openAngle: 45,
        },
        { name: "Platform", x: 29, y: 369.6, width: 27.2, angle: -90 },
        { name: "Platform", x: 66.75, y: 375.5, width: 60.5, angle: 0 },
        { name: "Platform", x: 160.15, y: 261.6, width: 178.5, angle: -45 },
        { name: "Platform", x: 181.75, y: 288.75, width: 253.4, angle: -45 },
        { name: "Tube", x: 500, y: 60, angle: 0 },
        { name: "Tube", x: 550, y: 60, angle: 0 },
        { name: "Tube", x: 600, y: 60, angle: 0, plusSensorBack: 30 },
        { name: "Tube", x: 450, y: 60, angle: 0 },
        { name: "Tube", x: 60, y: 300, angle: -90, plusSensorFront: 30 },
        { name: "Tube", x: 60, y: 250, angle: -90 },
        { name: "Tube", x: 60, y: 200, angle: -90 },
        { name: "Tube", x: 60, y: 150, angle: -90 },
        { name: "Tube", x: 60, y: 100, angle: -90, plusSensorBack: 30 },
        { name: "Tube", x: 100, y: 60, angle: 0, plusSensorFront: 30 },
        { name: "Tube", x: 150, y: 60, angle: 0 },
        { name: "Tube", x: 200, y: 60, angle: 0 },
        { name: "Tube", x: 250, y: 60, angle: 0 },
        { name: "Tube", x: 300, y: 60, angle: 0 },
        { name: "Tube", x: 350, y: 60, angle: 0 },
        { name: "Tube", x: 400, y: 60, angle: 0 },
      ],
    },
    {
      items: [
        { name: "PushButton", x: 668, y: 353.5, angle: 0, btnID: 2 },
        { name: "Platform", x: 577.5, y: 379.85, width: 86.9, angle: -75 },
        { name: "Platform", x: 393.65, y: 420, width: 212.6, angle: 0 },
        { name: "Cannon", x: 335.6, y: 332.85 },
        { name: "Basket", x: 530, y: 430 },
        { name: "Platform", x: 142.45, y: 267.5, width: 160, angle: -90 },
        { name: "Platform", x: 142.45, y: 104, width: 63.1, angle: -90 },
        { name: "Platform", x: 667.95, y: 360, width: 40.2, angle: 0 },
        { name: "Platform", x: 640.35, y: 210, width: 315, angle: -90 },
        { name: "Platform", x: 695.35, y: 210, width: 315, angle: -90 },
        { name: "Platform", x: 172.5, y: 420, width: 77.1, angle: 0 },
        { name: "Platform", x: 385.95, y: 340, width: 494, angle: 0 },
        { name: "Platform", x: 55.45, y: 207.2, width: 269.1, angle: -90 },
        { name: "Platform", x: 96.25, y: 380.7, width: 123.5, angle: -134 },
        { name: "Platform", x: 99.75, y: 65.45, width: 102.7, angle: 0 },
        {
          name: "Gate",
          x: 70,
          y: 200,
          direction: "left",
          gateLeftID: 1,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 130,
          y: 200,
          direction: "right",
          gateRightID: 1,
          openAngle: 90,
        },
        { name: "PushButton", x: 612.05, y: 333.5, angle: 0, btnID: 1 },
        { name: "Platform", x: 583.85, y: 192.55, width: 281, angle: -90 },
        {
          name: "Gate",
          x: 217.5,
          y: 417,
          direction: "left",
          gateLeftID: 2,
          openAngle: 90,
          inversed: !0,
        },
        {
          name: "Gate",
          x: 280,
          y: 417,
          direction: "right",
          gateRightID: 2,
          openAngle: 90,
          inversed: !0,
        },
        { name: "Peg", x: 143.5, y: 162.45 },
      ],
    },
    {
      items: [
        { name: "Platform", x: 411.05, y: 282.2, width: 66.4, angle: 0 },
        { name: "Platform", x: 654.1, y: 185.7, width: 82.4, angle: 0 },
        { name: "Platform", x: 588.35, y: 133.7, width: 81.8, angle: 0 },
        { name: "Platform", x: 568.95, y: 53.05, width: 223, angle: 0 },
        { name: "Platform", x: 120, y: 196.1, width: 270.9, angle: -90 },
        { name: "Cannon", x: 235.6, y: 329.85 },
        { name: "Tube", x: 480, y: 120, angle: -90, plusSensorBack: 30 },
        { name: "Tube", x: 520, y: 80, angle: 0, plusSensorFront: 30 },
        { name: "Tube", x: 570, y: 80, angle: 0 },
        { name: "Tube", x: 620, y: 80, angle: 0 },
        { name: "Tube", x: 660, y: 120, angle: 90, plusSensorFront: 30 },
        { name: "Tube", x: 480, y: 170, angle: -90 },
        { name: "Platform", x: 451.7, y: 167.6, width: 244.2, angle: -90 },
        { name: "Tube", x: 480, y: 220, angle: -90 },
        { name: "Tube", x: 480, y: 270, angle: -90, plusSensorFront: 30 },
        { name: "Tube", x: 440, y: 310, angle: 0 },
        { name: "Tube", x: 347, y: 270, angle: 90, plusSensorFront: 30 },
        { name: "Platform", x: 321.95, y: 281, width: 96.5, angle: -90 },
        { name: "Tube", x: 255, y: 36, angle: 180 },
        { name: "Tube", x: 305, y: 36, angle: 180, plusSensorFront: 30 },
        {
          name: "Tube",
          x: 347,
          y: 76,
          angle: -90,
          plusSensorFront: 30,
          plusSensorBack: 30,
        },
        { name: "Tube", x: 105, y: 36, angle: 180, plusSensorBack: 30 },
        { name: "Tube", x: 155, y: 36, angle: 180 },
        { name: "Tube", x: 205, y: 36, angle: 180 },
        { name: "Tube", x: 61, y: 76, angle: 90, plusSensorFront: 30 },
        { name: "Tube", x: 620, y: 160, angle: 180, plusSensorFront: 30 },
        { name: "Tube", x: 580, y: 200, angle: 90, plusSensorFront: 30 },
        { name: "Swings", x: 580, y: 395, angle: -20 },
        { name: "Stopper", x: 563, y: 415 },
        { name: "Stopper", x: 593, y: 415 },
        { name: "Platform", x: 304.45, y: 460, width: 451.1, angle: 0 },
        { name: "Domino", x: 450, y: 425 },
        { name: "Domino", x: 420, y: 425 },
        { name: "Domino", x: 390, y: 425 },
        { name: "Domino", x: 360, y: 425 },
        { name: "Domino", x: 330, y: 425 },
        { name: "Domino", x: 300, y: 425 },
        { name: "Domino", x: 270, y: 425 },
        { name: "Domino", x: 240, y: 425 },
        { name: "Domino", x: 210, y: 425 },
        { name: "Domino", x: 180, y: 425 },
        { name: "Domino", x: 150, y: 425 },
        {
          name: "Gate",
          x: 32.05,
          y: 113.05,
          direction: "left",
          gateLeftID: 1,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 92.05,
          y: 113.05,
          direction: "right",
          gateRightID: 1,
          openAngle: 90,
        },
        { name: "Basket", x: 61, y: 165.05 },
        { name: "PushButton", x: 102.45, y: 452.75, angle: 0, btnID: 2 },
        { name: "Platform", x: 639.95, y: 438.5, width: 40.2, angle: 0 },
        { name: "PushButton", x: 640, y: 431.25, angle: 0, btnID: 1 },
        { name: "Platform", x: 667.95, y: 319.85, width: 252.5, angle: -90 },
        { name: "Platform", x: 504.95, y: 213.75, width: 228.6, angle: -90 },
        { name: "Platform", x: 252.95, y: 335.65, width: 519.9, angle: 0 },
        { name: "Platform", x: 686.95, y: 112.2, width: 132.9, angle: -90 },
        { name: "Platform", x: 554.95, y: 195.65, width: 109, angle: -90 },
        { name: "Platform", x: 506.8, y: 424.55, width: 96, angle: -20 },
        { name: "Platform", x: 465.65, y: 446.75, width: 25, angle: -90 },
        { name: "Platform", x: 569.45, y: 106.95, width: 114.9, angle: 0 },
        { name: "Platform", x: 634.4, y: 120.65, width: 41.5, angle: -90 },
        { name: "Platform", x: 605.75, y: 215.45, width: 73.9, angle: -90 },
        { name: "Tube", x: 390, y: 310, angle: 0, plusSensorFront: 30 },
        { name: "Platform", x: 372.5, y: 215.75, width: 147.9, angle: -90 },
        {
          name: "Gate",
          x: 316.05,
          y: 111.05,
          direction: "left",
          gateLeftID: 2,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 376.05,
          y: 111.05,
          direction: "right",
          gateRightID: 2,
          openAngle: 90,
        },
        { name: "Platform", x: 372.5, y: 58.4, width: 84.8, angle: 90 },
        { name: "Platform", x: 36.5, y: 57.9, width: 85.8, angle: 90 },
        { name: "Platform", x: 204.9, y: 9.95, width: 351.8, angle: 0 },
      ],
    },
    {
      items: [
        { name: "Platform", x: 500, y: 266.45, width: 47, angle: -90 },
        { name: "Platform", x: 529.35, y: 244.25, width: 184.1, angle: 0 },
        {
          name: "Cannon",
          x: 208.6,
          y: 442.85,
          lowerAngle: -45,
          upperAngle: 10,
        },
        { name: "Basket", x: 50, y: 377 },
        { name: "Platform", x: 430, y: 201.4, width: 99, angle: -90 },
        {
          name: "Gate",
          x: 20,
          y: 330,
          direction: "left",
          gateLeftID: 2,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 80,
          y: 330,
          direction: "right",
          gateRightID: 2,
          openAngle: 90,
        },
        { name: "Platform", x: 99.95, y: 303.95, width: 302.1, angle: -90 },
        {
          name: "Gate",
          x: 20,
          y: 170,
          direction: "left",
          gateLeftID: 1,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 80,
          y: 170,
          direction: "right",
          gateRightID: 1,
          openAngle: 90,
        },
        { name: "Platform", x: 594.75, y: 438, width: 188.3, angle: 0 },
        { name: "PushButton", x: 668.5, y: 431, angle: 0, btnID: 2 },
        { name: "PushButton", x: 601, y: 237.5, angle: 0, btnID: 1 },
        { name: "Platform", x: 208, y: 449.15, width: 60, angle: 0 },
        { name: "Platform", x: 628.5, y: 210, width: 83, angle: -90 },
        { name: "Domino", x: 430, y: 126.9 },
        { name: "Peg", x: 340, y: 94.95 },
        { name: "Hammer", x: 411, y: 57.5, angle: -164 },
        { name: "Platform", x: 430, y: 22.45, width: 152.9, angle: -90 },
        { name: "Platform", x: 500, y: 395.4, width: 99, angle: -90 },
        { name: "Domino", x: 500, y: 320.9 },
        { name: "Platform", x: 696.5, y: 404, width: 83, angle: -90 },
        { name: "Peg", x: 370, y: 304.95 },
        { name: "Hammer", x: 441, y: 267.5, angle: -162 },
      ],
    },
    {
      items: [
        { name: "Cannon", x: 445.6, y: 343.85 },
        { name: "Basket", x: 160, y: 128 },
        {
          name: "Gate",
          x: 130,
          y: 80,
          direction: "left",
          gateLeftID: 1,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 190,
          y: 80,
          direction: "right",
          gateRightID: 1,
          openAngle: 90,
        },
        { name: "Platform", x: 72.45, y: 432.5, width: 40.2, angle: 0 },
        { name: "PushButton", x: 72.25, y: 426.5, angle: 0, btnID: 1 },
        { name: "Platform", x: 348.7, y: 350.15, width: 421.6, angle: 0 },
        { name: "Swings", x: 130, y: 395, angle: 20 },
        { name: "Stopper", x: 113, y: 415 },
        { name: "Stopper", x: 143, y: 415 },
        { name: "Platform", x: 363.95, y: 409.15, width: 404, angle: 0 },
        { name: "Teleport", x: 599, y: 420, angle: 0 },
        { name: "Teleport", x: 160, y: 50, angle: 180 },
        { name: "Platform", x: 566.95, y: 265.15, width: 185, angle: -90 },
        { name: "Platform", x: 630.95, y: 265.15, width: 185, angle: -90 },
        { name: "Platform", x: 204, y: 129.95, width: 87, angle: -90 },
        { name: "Platform", x: 105, y: 185, width: 344, angle: -90 },
        { name: "Platform", x: 695.2, y: 265.15, width: 185, angle: -90 },
        {
          name: "Gate",
          x: 570,
          y: 370,
          direction: "left",
          gateLeftID: 2,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 630,
          y: 370,
          direction: "right",
          gateRightID: 2,
          openAngle: 90,
        },
        { name: "Platform", x: 662.45, y: 412.5, width: 40.2, angle: 0 },
        { name: "PushButton", x: 662.25, y: 406.5, angle: 0, btnID: 2 },
        { name: "Platform", x: 585.6, y: 188.45, width: 35, angle: 30 },
        { name: "Platform", x: 585.6, y: 282.45, width: 35, angle: 30 },
        { name: "Platform", x: 612.1, y: 237.45, width: 35, angle: -30 },
        { name: "Platform", x: 612.1, y: 327.45, width: 35, angle: -30 },
        { name: "Platform", x: 650.1, y: 188.45, width: 35, angle: 30 },
        { name: "Platform", x: 650.1, y: 282.45, width: 35, angle: 30 },
        { name: "Platform", x: 676.6, y: 237.45, width: 35, angle: -30 },
        { name: "Platform", x: 676.6, y: 327.45, width: 35, angle: -30 },
      ],
    },
    {
      items: [
        { name: "Platform", x: 59.4, y: 411.35, width: 70.1, angle: 0 },
        { name: "Platform", x: 88.65, y: 361.7, width: 28.6, angle: -45 },
        { name: "Platform", x: 31.15, y: 361.7, width: 28.6, angle: 45 },
        { name: "Cannon", x: 285.6, y: 322.85 },
        { name: "Platform", x: 285, y: 329.15, width: 60, angle: 0 },
        { name: "Platform", x: 335, y: 377.95, width: 118.1, angle: -90 },
        { name: "Platform", x: 471.55, y: 311.4, width: 287.9, angle: 0 },
        { name: "Platform", x: 621, y: 200.05, width: 239.7, angle: -90 },
        {
          name: "BasketRail",
          x: 380,
          y: 356,
          orientation: 1,
          end: 680,
          basketID: 1,
        },
        { name: "Tube", x: 640, y: 60, angle: 0 },
        { name: "Tube", x: 680, y: 100, angle: 90, plusSensorFront: 30 },
        { name: "Tube", x: 540, y: 60, angle: 0, plusSensorFront: 30 },
        { name: "Tube", x: 590, y: 60, angle: 0 },
        { name: "Tube", x: 500, y: 100, angle: -90, plusSensorFront: 30 },
        { name: "WeightBall", x: 60, y: 121.05, wbDensity: 1 },
        { name: "PushButton", x: 60, y: 404.25, angle: 0, btnID: 1 },
        { name: "Platform", x: 99, y: 288.9, width: 259.9, angle: -90 },
        { name: "Platform", x: 621, y: 20.85, width: 40.2, angle: -90 },
        { name: "Platform", x: 495.7, y: 42.8, width: 38.7, angle: 0 },
        { name: "Platform", x: 483.8, y: 62.6, width: 24.8, angle: 90 },
        { name: "Platform", x: 685.2, y: 42.8, width: 38.7, angle: 0 },
        { name: "Platform", x: 697.05, y: 62.6, width: 24.8, angle: 90 },
        { name: "Peg", x: 175.5, y: 61.45 },
        { name: "Teleport", x: 59, y: 176.75, angle: 0, teleportID: 1 },
        { name: "Teleport", x: 59, y: 263.15, angle: 180, teleportID: 1 },
        { name: "Platform", x: 20, y: 288.9, width: 259.9, angle: -90 },
        { name: "Hammer", x: 99.75, y: 67.45, angle: -51, hmDensity: 3 },
      ],
    },
    {
      items: [
        { name: "Cannon", x: 155.6, y: 412.85 },
        { name: "Platform", x: 155, y: 419.15, width: 60, angle: 0 },
        { name: "Platform", x: 368.05, y: 166.4, width: 231, angle: 0 },
        { name: "Platform", x: 558.15, y: 265.1, width: 256.5, angle: 51 },
        { name: "WeightBall", x: 255, y: 49.55, wbDensity: 3 },
        { name: "PushButton", x: 672, y: 415, angle: 0, btnID: 1 },
        { name: "Platform", x: 636.5, y: 387.55, width: 55.2, angle: -90 },
        { name: "Platform", x: 705.55, y: 238.6, width: 369.9, angle: -90 },
        { name: "Platform", x: 671.35, y: 422.15, width: 83.6, angle: 0 },
        { name: "Platform", x: 77.6, y: 151.1, width: 251.1, angle: -90 },
        { name: "Platform", x: 42.55, y: 18.05, width: 85.1, angle: 0 },
        {
          name: "BasketRail",
          x: 35,
          y: 45,
          orientation: 0,
          end: 340,
          basketID: 1,
        },
        { name: "Platform", x: 92.3, y: 314.5, width: 60, angle: -30 },
        { name: "Platform", x: 253.7, y: 131.95, width: 84, angle: -90 },
        { name: "Domino", x: 478, y: 133 },
        { name: "Domino", x: 440.5, y: 133 },
        { name: "Domino", x: 403, y: 133 },
        { name: "Domino", x: 365.5, y: 133 },
        { name: "Domino", x: 328, y: 133 },
        { name: "Platform", x: 253.75, y: -184.6, width: 380.8, angle: -90 },
      ],
    },
    {
      items: [
        { name: "Cannon", x: 185.6, y: 422.85, lowerAngle: -45, upperAngle: 0 },
        { name: "Platform", x: 185, y: 429.15, width: 60, angle: 0 },
        {
          name: "BasketRail",
          x: 650,
          y: 326,
          orientation: 1,
          end: 450,
          basketID: 1,
        },
        { name: "Teleport", x: 579, y: 110, angle: 0, teleportID: 1 },
        { name: "Teleport", x: 450, y: 140, angle: 180, teleportID: 1 },
        { name: "Platform", x: 254.75, y: 319.05, width: 297, angle: -90 },
        { name: "PushButton", x: 320.6, y: 102.85, angle: -90, btnID: 2 },
        { name: "Platform", x: 327.5, y: 104.25, width: 57.1, angle: -90 },
        { name: "Hammer", x: 240, y: 80, angle: -139 },
        { name: "Peg", x: 165, y: 90 },
        { name: "PushButton", x: 52, y: 422.25, angle: 0, btnID: 1 },
        { name: "Platform", x: 50.6, y: 429, width: 57.1, angle: 0 },
        {
          name: "Gate",
          x: 550,
          y: 66,
          direction: "left",
          gateLeftID: 2,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 610,
          y: 66,
          direction: "right",
          gateRightID: 2,
          openAngle: 45,
        },
        { name: "Ball", x: 580, y: 55 },
      ],
    },
    {
      items: [
        {
          name: "Cannon",
          x: 355.6,
          y: 362.85,
          lowerAngle: -15,
          upperAngle: 15,
        },
        { name: "Platform", x: 355, y: 369.15, width: 60, angle: 0 },
        { name: "Tube", x: 80, y: 360, angle: -90, plusSensorFront: 30 },
        { name: "Tube", x: 120, y: 400, angle: 180, plusSensorFront: 30 },
        { name: "Tube", x: 80, y: 310, angle: -90 },
        { name: "Tube", x: 80, y: 260, angle: -90 },
        { name: "Tube", x: 80, y: 160, angle: -90, plusSensorFront: 50 },
        { name: "Tube", x: 80, y: 110, angle: -90 },
        { name: "Tube", x: 619.2, y: 70, angle: 0 },
        { name: "Tube", x: 569.2, y: 70, angle: 0 },
        { name: "Tube", x: 519.2, y: 70, angle: 0 },
        { name: "Tube", x: 469.2, y: 70, angle: 0 },
        { name: "Tube", x: 419.2, y: 70, angle: 0 },
        { name: "Tube", x: 369.2, y: 70, angle: 0 },
        { name: "Tube", x: 319.2, y: 70, angle: 0 },
        { name: "Tube", x: 269.2, y: 70, angle: 0 },
        { name: "Tube", x: 219.2, y: 70, angle: 0 },
        { name: "Tube", x: 169.2, y: 70, angle: 0 },
        { name: "Tube", x: 119.2, y: 70, angle: 0, plusSensorFront: 30 },
        { name: "Tube", x: 660, y: 110, angle: 90, plusSensorFront: 30 },
        { name: "Platform", x: 191.1, y: 405.7, width: 83.9, angle: -15 },
        { name: "Platform", x: 273.1, y: 339.1, width: 148.8, angle: -54 },
        { name: "Platform", x: 277.2, y: 201.4, width: 83.9, angle: -52 },
        { name: "PushButton", x: 162, y: 295.25, angle: 0, btnID: 1 },
        { name: "Platform", x: 160.6, y: 302.15, width: 57.1, angle: 0 },
        { name: "Swings", x: 220, y: 275, angle: -20 },
        { name: "Stopper", x: 203, y: 295 },
        { name: "Stopper", x: 233, y: 295 },
        { name: "Platform", x: 124.55, y: 290, width: 38, angle: -90 },
        { name: "Platform", x: 294.8, y: 250, width: 86.1, angle: -120 },
        { name: "Platform", x: 201.75, y: 160.6, width: 148.1, angle: -90 },
        {
          name: "BasketRail",
          x: 585,
          y: 133,
          orientation: 0,
          end: 433,
          basketID: 2,
        },
        { name: "PushButton", x: 667, y: 295.25, angle: 0, btnID: 2 },
        { name: "Platform", x: 670.6, y: 302.15, width: 57.1, angle: 0 },
        { name: "Platform", x: 541.75, y: 220.6, width: 268.1, angle: -90 },
        { name: "Platform", x: 526.7, y: 394, width: 50.7, angle: 37 },
        { name: "Platform", x: 495.7, y: 362.1, width: 52.7, angle: 52 },
        { name: "Platform", x: 448.05, y: 265.05, width: 168.5, angle: 67 },
        { name: "Platform", x: 526.45, y: 335.1, width: 52.7, angle: 52 },
        { name: "Platform", x: 478.8, y: 238.05, width: 168.5, angle: 67 },
        { name: "Platform", x: 404.2, y: 185.1, width: 30.5, angle: 22 },
        { name: "Platform", x: 448.25, y: 149.95, width: 30.5, angle: -83 },
        { name: "Platform", x: 634.25, y: 199.15, width: 221.1, angle: -90 },
        {
          name: "Gate",
          x: 50,
          y: 206,
          direction: "left",
          gateLeftID: 1,
          openAngle: 90,
        },
        {
          name: "Gate",
          x: 110,
          y: 206,
          direction: "right",
          gateRightID: 1,
          openAngle: 90,
        },
        { name: "Platform", x: 74.95, y: 52.8, width: 38.7, angle: 0 },
        { name: "Platform", x: 63.05, y: 72.6, width: 24.8, angle: 90 },
        { name: "Platform", x: 74.95, y: 417.05, width: 38.7, angle: 0 },
        { name: "Platform", x: 63.05, y: 396.85, width: 24.8, angle: 90 },
        { name: "Platform", x: 664.7, y: 52.8, width: 38.7, angle: 0 },
        { name: "Platform", x: 676.3, y: 72.6, width: 24.8, angle: 90 },
        { name: "Platform", x: 645.45, y: 396.7, width: 69.7, angle: -45 },
        { name: "Platform", x: 648, y: 340.35, width: 73.4, angle: 67 },
      ],
    },
    {
      items: [
        {
          name: "Cannon",
          x: 125.6,
          y: 352.85,
          lowerAngle: -45,
          upperAngle: 60,
        },
        { name: "Platform", x: 674.1, y: 283.2, width: 90, angle: 0 },
        { name: "Platform", x: 560.2, y: 365.45, width: 320, angle: 2 },
        {
          name: "Gate",
          x: 330,
          y: 356,
          direction: "left",
          gateLeftID: 1,
          openAngle: 45,
        },
        {
          name: "Gate",
          x: 390,
          y: 356,
          direction: "right",
          gateRightID: 1,
          openAngle: 45,
        },
        { name: "Platform", x: 508.5, y: 177, width: 281.9, angle: 2 },
        { name: "PushButton", x: 683.25, y: 276.25, angle: 0, btnID: 2 },
        { name: "Platform", x: 543.35, y: 278.2, width: 176.9, angle: 3 },
        { name: "Platform", x: 711.5, y: 235.5, width: 90, angle: -90 },
        { name: "Platform", x: 312.5, y: 333.5, width: 38, angle: -90 },
        { name: "PushButton", x: 124.7, y: 23.45, angle: 180, btnID: 1 },
        { name: "Platform", x: 125, y: 16.95, width: 85.1, angle: 0 },
        { name: "WeightBall", x: 312.5, y: 274.55 },
        { name: "Platform", x: 356.45, y: 200.4, width: 71.5, angle: -61 },
        { name: "Platform", x: 461.5, y: 227, width: 99, angle: -90 },
        { name: "Platform", x: 461.5, y: -102.95, width: 447.2, angle: -90 },
        {
          name: "BasketRail",
          x: 45,
          y: 421,
          orientation: 1,
          end: 645,
          basketID: 2,
        },
        { name: "Platform", x: 157.6, y: 361, width: 324.9, angle: 0 },
      ],
    },
  ];
  S.prototype = Object.create(PIXI.Container.prototype);
  S.prototype.constructor = S;
  S.prototype.run = function (a, b) {
    a && this.once("onMiddle", a, b || this);
    var d = this;
    this.show(function () {
      TweenMax.delayedCall(
        0.1,
        function () {
          d.emit("onMiddle");
          TweenMax.delayedCall(0.1, this.hide, null, this);
        },
        null,
        this
      );
    }, this);
  };
  S.prototype.show = function (a, b) {
    a && this.once("showComplete", a, b || this);
    var d = this;
    TweenMax.to(this, 0.4, {
      alpha: 1,
      onComplete: function () {
        d.emit("showComplete");
      },
    });
  };
  S.prototype.hide = function (a, b) {
    a && this.once("hideComplete", a, b || this);
    var d = this;
    TweenMax.to(this, 0.4, {
      alpha: 0,
      onComplete: function () {
        d.emit("hideComplete");
      },
    });
  };
  var c = {
    pixi: null,
    physics: null,
    physWorld: null,
    physScale: 30,
    soundMng: null,
    assets: null,
    inited: !1,
    audioEnabled: !1,
    musicOn: !0,
    soundOn: !0,
    levelMng: null,
    menuState: null,
    playState: null,
    shutter: null,
    tutorial: null,
    SAVE_KEY_LAST_OPENED: "lastOpened",
    SAVE_KEY_MUSIC: "saveMusic",
    SAVE_KEY_SOUND: "saveSound",
    storage: null,
    browserEvents: null,
    gameWidth0: 720,
    gameHeight0: 500,
    gameMaxWidth0: 720,
    gameMaxHeight0: 500,
    gameWidth1: null,
    gameHeight1: null,
    gameMaxWidth1: null,
    gameMaxHeight1: null,
    border: null,
    canvasWidth: null,
    canvasHeight: null,
    scale: 1,
    imgRotate: null,
    rnd: null,
    device: null,
    fps: null,
    sponsorURL: "",
  };
  p.App = c;
  p.trace = console.log;
  ka();
  c.mainTheme = null;
  c._checkAudio = function () {
    c.audioEnabled
      ? (void 0 != c.storage.get(c.SAVE_KEY_MUSIC) &&
          (c.musicOn = "true" == c.storage.get(c.SAVE_KEY_MUSIC)),
        void 0 != c.storage.get(c.SAVE_KEY_SOUND) &&
          (c.soundOn = "true" == c.storage.get(c.SAVE_KEY_SOUND)),
        (c.mainTheme = c.assets.getSound("sndTheme")),
        (c.mainTheme.loop = !0),
        (c.mainTheme.volume = 0.9),
        c.musicOn && c.mainTheme.play(),
        c.browserEvents.on("onPageShow", function (a) {
          isFocusLost = !1;
          resumeAllSoundsIfAdsNotBeingShownAndFocusNotBeingLost();
        }),
        c.browserEvents.on("onPageHide", function (a) {
          isFocusLost = !0;
          PIXI.sound.pauseAll();
        }),
        c.browserEvents.on("onFocusGet", function (a) {
          isFocusLost = !1;
          resumeAllSoundsIfAdsNotBeingShownAndFocusNotBeingLost();
        }),
        c.browserEvents.on("onFocusLost", function (a) {
          isFocusLost = !0;
          PIXI.sound.pauseAll();
        }))
      : ((c.musicOn = !1), (c.soundOn = !1));
  };
  c.setMusicEnable = function (a) {
    !1 !== c.audioEnabled &&
      ((c.musicOn = a),
      c.musicOn
        ? c.mainTheme.isPlaying ||
          (c.mainTheme.resume(), c.mainTheme.isPlaying || c.mainTheme.play())
        : c.mainTheme.isPlaying && c.mainTheme.pause(),
      c.storage.set(c.SAVE_KEY_MUSIC, c.musicOn));
  };
  c.switchMusicEnable = function () {
    c.setMusicEnable(!c.musicOn);
  };
  c.setSoundEnable = function (a) {
    !1 !== c.audioEnabled &&
      ((c.soundOn = a), c.storage.set(c.SAVE_KEY_SOUND, c.soundOn));
  };
  c.switchSoundEnable = function () {
    c.setSoundEnable(!c.soundOn);
  };
  p.unlockAllLevels = function () {
    c.levelMng && c.levelMng.unlockAllLevels();
    c.menuState && c.menuState._levelsDialog.refresh();
  };
  parent.unlockAllLevels = p.unlockAllLevels;
})(window);
var isFocusLost = !1;
function resumeAllSoundsIfAdsNotBeingShownAndFocusNotBeingLost() {
  isAdBreakActive || isFocusLost || PIXI.sound.resumeAll();
}
