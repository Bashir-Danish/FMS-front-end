import{d as x,m as I,r as v,z as V,o as s,c as n,q as h,a as e,H as B,g as l,t as f,w as y,f as r,F,k as z,I as k,x as A,y as E,_ as M}from"./index-19028af0.js";import{B as N}from"./baseinput-96fb8b79.js";import{A as U,P as $,D as q}from"./PencilOutline-5bef6d5a.js";/* empty css                                                                  */const b=c=>(A("data-v-df255427"),c=c(),E(),c),P={key:1,class:"dep-form-overlay"},H={class:"dep-form"},L={key:0},O={key:1},R=["onSubmit"],j={class:"input-grout"},G={class:"button-group"},J={type:"submit"},K={class:"departments-list"},Q={class:"header"},T=b(()=>e("span",{id:"num"}," شماره ",-1)),W=b(()=>e("span",{id:"name"}," نام ",-1)),X={id:"add-dep-button"},Y={class:"list-item-content"},Z={class:"department-number"},ee={class:"department-name"},te={class:"add-dep-buttons"},ae=["onClick"],oe=["onClick"],se=x({__name:"department",setup(c){const _=I(),d=v({name:""}),o=v(!1),i=v(!1),m=v(null),w=t=>{m.value=t,d.value.name=t.name,i.value=!0},g=async()=>{if(o.value)try{await _.createDepartment(d.value.name),p()}catch(t){console.error("Error creating department:",t),o.value=!1}else if(i.value&&m.value)try{await _.updateDepartment({department_id:m.value.department_id,name:d.value.name}),p()}catch(t){console.error("Error updating department:",t)}},C=async t=>{if(window.confirm("Are you sure you want to delete this department?"))try{await _.deleteDepartment(t)}catch(a){console.log(a)}},p=()=>{m.value=null,d.value.name="",o.value=!1,i.value=!1};return V(async()=>{}),(t,u)=>(s(),n("div",null,[o.value||i.value?(s(),n("div",{key:0,class:"dark-container",onClick:p})):h("",!0),o.value||i.value?(s(),n("div",P,[e("div",H,[o.value?(s(),n("h2",L,"ایجاد دپارتمان جدید")):h("",!0),i.value?(s(),n("h2",O,"ویرایش دپارتمان")):h("",!0),e("form",{onSubmit:B(g,["prevent"])},[e("div",j,[l(N,{modelValue:d.value.name,"onUpdate:modelValue":u[0]||(u[0]=a=>d.value.name=a),"input-type":"text","input-id":"نام:","is-required":!0,placeholder:"نام را وارد کنید"},null,8,["modelValue"])]),e("div",G,[e("button",J,f(o.value?"ذخیره":"ویرایش"),1),e("button",{onClick:p,type:"button"},"لغو")])],40,R)])])):h("",!0),e("div",K,[e("div",Q,[T,W,e("span",X,[e("button",{onClick:u[1]||(u[1]=a=>o.value=!0)},[l(r(k),null,{default:y(()=>[l(r(U))]),_:1})])])]),e("ul",null,[(s(!0),n(F,null,z(r(_).departments,(a,D)=>(s(),n("li",{key:a.department_id,class:"item"},[e("div",Y,[e("span",Z,f(D+1),1),e("p",ee,f(a.name),1),e("div",te,[e("button",{onClick:S=>w(a)},[l(r(k),{size:"20",color:"green"},{default:y(()=>[l(r($))]),_:1})],8,ae),e("button",{onClick:S=>C(a.department_id)},[l(r(k),{size:"20",color:"red"},{default:y(()=>[l(r(q))]),_:1})],8,oe)])])]))),128))])])]))}});const ie=M(se,[["__scopeId","data-v-df255427"]]);export{ie as default};
