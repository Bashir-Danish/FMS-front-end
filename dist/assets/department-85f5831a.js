import{d as I,m as x,r as v,y as V,o as s,c as n,h,a as e,G as B,b as l,t as f,w as y,e as r,F,s as A,I as b,p as E,j as M,_ as N}from"./index-32ea14b6.js";import{B as U}from"./baseinput-b43a68db.js";import{A as $,P as z,D as P}from"./PencilOutline-55321d82.js";/* empty css                                                                  */const k=u=>(E("data-v-3ec7eb6c"),u=u(),M(),u),j={key:1,class:"dep-form-overlay"},q={class:"dep-form"},G={key:0},L={key:1},O=["onSubmit"],R={class:"input-grout"},H={class:"button-group"},J={type:"submit"},K={class:"departments-list"},Q={class:"header"},T=k(()=>e("span",{id:"num"}," شماره ",-1)),W=k(()=>e("span",{id:"name"}," نام ",-1)),X={id:"add-dep-button"},Y={class:"list-item-content"},Z={class:"department-number"},ee={class:"department-name"},te={class:"add-dep-buttons"},ae=["onClick"],oe=["onClick"],se=I({__name:"department",setup(u){const _=x(),d=v({name:""}),o=v(!1),c=v(!1),m=v(null),w=t=>{m.value=t,d.value.name=t.name,c.value=!0},C=async()=>{if(o.value)try{await _.createDepartment(d.value.name),p()}catch(t){console.error("Error creating department:",t)}else if(c.value&&m.value)try{await _.updateDepartment({department_id:m.value.department_id,name:d.value.name}),p()}catch(t){console.error("Error updating department:",t)}},D=async t=>{if(window.confirm("Are you sure you want to delete this department?"))try{await _.deleteDepartment(t)}catch(a){console.log(a)}},p=()=>{m.value=null,d.value.name="",o.value=!1,c.value=!1};return V(async()=>{}),(t,i)=>(s(),n("div",null,[o.value||c.value?(s(),n("div",{key:0,class:"dark-container",onClick:p})):h("",!0),o.value||c.value?(s(),n("div",j,[e("div",q,[o.value?(s(),n("h2",G,"ایجاد دپارتمان جدید")):h("",!0),c.value?(s(),n("h2",L,"ویرایش دپارتمان")):h("",!0),e("form",{onSubmit:B(C,["prevent"])},[e("div",R,[l(U,{modelValue:d.value.name,"onUpdate:modelValue":i[0]||(i[0]=a=>d.value.name=a),"input-type":"text","input-id":"نام:","is-required":!0,placeholder:"نام را وارد کنید"},null,8,["modelValue"])]),e("div",H,[e("button",J,f(o.value?"ذخیره":"ویرایش"),1),e("button",{onClick:p,type:"button"},"لغو")])],40,O)])])):h("",!0),e("div",K,[e("div",Q,[T,W,e("span",X,[e("button",{onClick:i[1]||(i[1]=a=>o.value=!0)},[l(r(b),null,{default:y(()=>[l(r($))]),_:1})])])]),e("ul",null,[(s(!0),n(F,null,A(r(_).departments,(a,g)=>(s(),n("li",{key:a.department_id,class:"item"},[e("div",Y,[e("span",Z,f(g+1),1),e("p",ee,f(a.name),1),e("div",te,[e("button",{onClick:S=>w(a)},[l(r(b),{size:"20",color:"green"},{default:y(()=>[l(r(z))]),_:1})],8,ae),e("button",{onClick:S=>D(a.department_id)},[l(r(b),{size:"20",color:"red"},{default:y(()=>[l(r(P))]),_:1})],8,oe)])])]))),128))])])]))}});const ce=N(se,[["__scopeId","data-v-3ec7eb6c"]]);export{ce as default};