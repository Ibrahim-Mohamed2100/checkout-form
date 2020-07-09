function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"+l/p":function(e,t,n){"use strict";n.r(t),n.d(t,"PaymentTabPageModule",(function(){return w}));var i=n("TEn/"),r=n("tyNb"),o=n("ofXK"),a=n("3Pt+"),b=n("R0Ic"),c=n("Cfvw"),m=n("fXoL"),l=n("e8h1"),s=n("UTcu"),u=n("MJr+");function d(e,t){1&e&&(m.Mb(0,"p"),m.Mb(1,"ion-text",20),m.ec(2," Please fix all the errors. "),m.Lb(),m.Lb())}function p(e,t){1&e&&(m.Mb(0,"div"),m.ec(1," Field is required "),m.Lb())}function f(e,t){1&e&&(m.Mb(0,"div"),m.ec(1," Invalid format "),m.Lb())}function h(e,t){1&e&&(m.Mb(0,"div"),m.ec(1," Field is required "),m.Lb()),2&e&&m.Yb("@requiredTrigger",void 0)}function y(e,t){1&e&&(m.Mb(0,"div"),m.ec(1," Field is required "),m.Lb()),2&e&&m.Yb("@requiredTrigger",void 0)}var g,v,M,F=((g=function(){function e(t,n,i,r){_classCallCheck(this,e),this.storage=t,this.authGuard=n,this.router=i,this.tabPage=r,this.form={}}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.paymentForm=new a.d({cardNumber:new a.b("",[a.p.required]),cvv:new a.b("",a.p.required),expiryDate:new a.b("",a.p.required)}),Object(c.a)(this.storage.get("forms-data")).subscribe((function(t){if(e.form=t,t&&t.paymentForm){var n=e.form.paymentForm.model;e.paymentForm.get("cardNumber").setValue(n.cardNumber),e.paymentForm.get("cvv").setValue(n.cvv),e.paymentForm.get("expiryDate").setValue(n.expiryDate)}})),this.paymentForm.valueChanges.subscribe((function(t){e.authGuard.userAuth=!!e.paymentForm.valid,e.form.paymentForm={dirty:e.paymentForm.dirty,model:t,status:e.paymentForm.status},Object(c.a)(e.storage.set("forms-data",e.form)).subscribe()}))}},{key:"onSubmit",value:function(){this.validateAllFormFields(this.paymentForm),this.paymentForm.valid?(this.isValidForm=!0,this.router.navigate(["review"])):this.isValidForm=!1}},{key:"onReset",value:function(){this.isValidForm=null}},{key:"onPrevious",value:function(){this.router.navigate(["shipping"]),this.tabPage.segmentValue="shipping"}},{key:"validateAllFormFields",value:function(e){var t=this;Object.keys(e.controls).forEach((function(n){var i=e.get(n);i instanceof a.b?i.markAsTouched({onlySelf:!0}):i instanceof a.d&&t.validateAllFormFields(i)}))}}]),e}()).\u0275fac=function(e){return new(e||g)(m.Jb(l.b),m.Jb(s.a),m.Jb(r.g),m.Jb(u.a))},g.\u0275cmp=m.Db({type:g,selectors:[["app-payment-tab"]],decls:47,vars:6,consts:[[1,""],[1,"list-form",3,"formGroup"],[1,"checkout-container"],[1,"ion-text-start"],["type","reset","color","light",3,"click"],["slot","end","name","close"],[4,"ngIf"],[1,"ion-no-padding","ion-no-margin","ion-margin-vertical"],[1,"ion-margin-horizontal"],["size","9","size-sm",""],["position","floating",1,"required"],["inputmode","numeric","maxlength","16","minlength","16","placeholder","####-####-####-####","formControlName","cardNumber"],["displayFormat","MMMM YYYY","pickerFormat","MMM YYYY","formControlName","expiryDate"],["inputmode","numeric","type","tel","maxlength","3","minlength","3","formControlName","cvv"],[1,"ion-no-padding"],["type","button","color","light",3,"click"],["slot","start","name","chevron-back-outline"],[1,"ion-text-end"],["type","submit","color","tertiary",3,"click"],["slot","end","name","chevron-forward-outline"],["color","danger"]],template:function(e,t){1&e&&(m.Mb(0,"ion-content",0),m.Mb(1,"form",1),m.Mb(2,"div",2),m.Mb(3,"div",3),m.Mb(4,"ion-button",4),m.Tb("click",(function(){return t.onReset()})),m.Mb(5,"ion-label"),m.ec(6,"Reset"),m.Lb(),m.Kb(7,"ion-icon",5),m.Lb(),m.Lb(),m.dc(8,d,3,0,"p",6),m.Mb(9,"ion-card",7),m.Mb(10,"ion-card-header",8),m.Mb(11,"ion-card-title"),m.ec(12,"Payment Method"),m.Lb(),m.Lb(),m.Mb(13,"ion-grid"),m.Mb(14,"ion-row"),m.Mb(15,"ion-col",9),m.Mb(16,"ion-item",0),m.Mb(17,"ion-label",10),m.ec(18,"Card Number"),m.Lb(),m.Kb(19,"ion-input",11),m.Lb(),m.dc(20,p,2,0,"div",6),m.dc(21,f,2,0,"div",6),m.Lb(),m.Lb(),m.Mb(22,"ion-row"),m.Mb(23,"ion-col",9),m.Mb(24,"ion-item"),m.Mb(25,"ion-label",10),m.ec(26,"Expiry date"),m.Lb(),m.Kb(27,"ion-datetime",12),m.Lb(),m.dc(28,h,2,1,"div",6),m.Lb(),m.Mb(29,"ion-col",9),m.Mb(30,"ion-item",0),m.Mb(31,"ion-label",10),m.ec(32,"CVV"),m.Lb(),m.Kb(33,"ion-input",13),m.Lb(),m.dc(34,y,2,1,"div",6),m.Lb(),m.Lb(),m.Lb(),m.Lb(),m.Mb(35,"ion-grid",14),m.Mb(36,"ion-row"),m.Mb(37,"ion-col",3),m.Mb(38,"ion-button",15),m.Tb("click",(function(){return t.onPrevious()})),m.Mb(39,"ion-label"),m.ec(40,"Previous"),m.Lb(),m.Kb(41,"ion-icon",16),m.Lb(),m.Lb(),m.Mb(42,"ion-col",17),m.Mb(43,"ion-button",18),m.Tb("click",(function(){return t.onSubmit()})),m.Mb(44,"ion-label"),m.ec(45,"Next"),m.Lb(),m.Kb(46,"ion-icon",19),m.Lb(),m.Lb(),m.Lb(),m.Lb(),m.Lb(),m.Lb(),m.Lb()),2&e&&(m.zb(1),m.Yb("formGroup",t.paymentForm),m.zb(7),m.Yb("ngIf",0==t.isValidForm),m.zb(12),m.Yb("ngIf",t.paymentForm.get("cardNumber").hasError("required")&&(t.paymentForm.get("cardNumber").dirty||t.paymentForm.get("cardNumber").touched)),m.zb(1),m.Yb("ngIf",t.paymentForm.get("cardNumber").hasError("minlength")&&t.paymentForm.get("cardNumber").dirty),m.zb(7),m.Yb("ngIf",!t.paymentForm.get("expiryDate").valid&&(t.paymentForm.get("expiryDate").dirty||t.paymentForm.get("expiryDate").touched)),m.zb(6),m.Yb("ngIf",!t.paymentForm.get("cvv").valid&&(t.paymentForm.get("cvv").dirty||t.paymentForm.get("cvv").touched)))},directives:[i.i,a.q,a.m,a.e,i.c,i.o,i.l,o.h,i.d,i.e,i.f,i.k,i.u,i.h,i.n,i.m,i.G,a.h,a.i,a.l,a.c,i.j,i.F,i.z],styles:[""],data:{animation:[Object(b.i)("requiredTrigger",[Object(b.h)(":enter",[Object(b.g)({transform:"translateY(-100%)"}),Object(b.e)("150ms",Object(b.g)({transform:"translateY(0%)"}))]),Object(b.h)(":leave",[Object(b.e)("150ms",Object(b.g)({transform:"translateY(-100%)"}))])])]}}),g),L=[{path:"",component:F}],k=((M=function e(){_classCallCheck(this,e)}).\u0275mod=m.Hb({type:M}),M.\u0275inj=m.Gb({factory:function(e){return new(e||M)},imports:[[r.i.forChild(L)],r.i]}),M),w=((v=function e(){_classCallCheck(this,e)}).\u0275mod=m.Hb({type:v}),v.\u0275inj=m.Gb({factory:function(e){return new(e||v)},imports:[[i.B,o.b,a.g,a.o,r.i.forChild([{path:"",component:F}]),k]]}),v)}}]);