import{d as A,p as B,m as F,r as _,z as $,o as l,c as n,q as p,g as u,w,a as e,H as z,j as M,J as E,h as C,t as c,G,f as r,F as S,k as L,K as P,I as N,x as j,y as H,_ as J}from"./index-19028af0.js";import{B as k}from"./baseinput-96fb8b79.js";import{d as I}from"./dropzone-189e4d25.js";import{A as K,P as O,D as R}from"./PencilOutline-5bef6d5a.js";/* empty css                                                                  */const h=f=>(j("data-v-4b04fa07"),f=f(),H(),f),Z={key:0,class:"user-form-overlay"},Q={class:"user-form"},W={key:0},X={key:1},Y={class:"input-groups"},ee={class:"input-group"},se={class:"input-group"},te={class:"input-group"},ae={class:"input-groups"},oe={class:"input-group"},le={class:"input-group"},ue=h(()=>e("label",{for:"number"},"شماره ترم:",-1)),ne=h(()=>e("option",{value:"",disabled:"",selected:""}," نوع کاربر",-1)),ie=h(()=>e("option",{value:"user"},"کاربر",-1)),re=h(()=>e("option",{value:"teacher"},"استاد",-1)),de=[ne,ie,re],pe={class:"image-input"},ce=h(()=>e("label",{for:"image"},"پروفایل",-1)),ve={class:"dropzone"},me={class:"button-group"},_e={class:"users-list"},he={class:"header"},fe=P('<span id="num" data-v-4b04fa07>شماره</span><span id="user-picture" data-v-4b04fa07>پروفایل</span><span id="user-name" data-v-4b04fa07>نام</span><span id="user-email" data-v-4b04fa07>ایمیل</span><span id="user-type" data-v-4b04fa07>نوع کاربر</span>',5),ye={id:"add-button"},ge={class:"list-item-content"},be={class:"number"},we={class:"user-picture"},ke=["src"],Ve={key:1},Ne={class:"user-name"},Ue={class:"user-email"},Ce={class:"user-type"},Se={class:"edit-user-buttons"},Ie=["onClick"],Te=["onClick"],xe=A({__name:"users",setup(f){const v=B(),V=F(),s=_({name:"",lastName:"",email:"",password:"",picture:null,userType:""}),i=_(!1),d=_(!1),m=_(null),T=o=>{m.value=o,s.value={...o},d.value=!0},y=_(),x=async()=>{if(i.value)try{await v.createUser(s.value),g()}catch(o){console.error("Error creating user:",o)}else if(d.value&&m.value){try{await v.updateUser({user_id:m.value.user_id,name:s.value.name,lastName:s.value.lastName,email:s.value.email,password:s.value.password,picture:s.value.picture,userType:s.value.userType}),g()}catch(o){console.error("Error updating user:",o)}s.value.name="",s.value.lastName="",s.value.email="",s.value.password="",s.value.userType="",s.value.picture=null}},D=async o=>{if(window.confirm("Are you sure you want to delete this user?"))try{await v.deleteUser(o)}catch(t){console.log(t)}},g=()=>{m.value=null,s.value={name:"",lastName:"",email:"",password:"",picture:null,userType:"کاربر"},i.value=!1,d.value=!1,V.File=[]},U=async o=>{y.value=!0;const a=await V.uploadImage("user",o);console.log(o),a!==""&&(s.value.picture=a,y.value=!1,console.log(s.value))};return $(async()=>{await v.getAllUsers()}),(o,a)=>(l(),n(S,null,[i.value||d.value?(l(),n("div",{key:0,class:"dark-container",onClick:g})):p("",!0),u(G,{name:"bounce"},{default:w(()=>[i.value||d.value?(l(),n("div",Z,[e("div",Q,[i.value?(l(),n("h2",W,"ایجاد کاربر جدید")):p("",!0),d.value?(l(),n("h2",X,"ویرایش کاربر")):p("",!0),e("form",{onSubmit:a[8]||(a[8]=z(()=>{},["prevent"])),enctype:"multipart/form-data"},[e("div",Y,[e("div",ee,[u(k,{modelValue:s.value.name,"onUpdate:modelValue":a[0]||(a[0]=t=>s.value.name=t),"input-type":"text","input-id":"نام:","is-required":!0,placeholder:"نام را وارد کنید"},null,8,["modelValue"])]),e("div",se,[u(k,{modelValue:s.value.lastName,"onUpdate:modelValue":a[1]||(a[1]=t=>s.value.lastName=t),"input-type":"text","input-id":"تخلص:","is-required":!0,placeholder:"تخلص را وارد کنید"},null,8,["modelValue"])])]),e("div",te,[u(k,{modelValue:s.value.email,"onUpdate:modelValue":a[2]||(a[2]=t=>s.value.email=t),"input-type":"email","input-id":"ایمیل:","is-required":!0,placeholder:"ایمیل را وارد کنید"},null,8,["modelValue"])]),e("div",ae,[e("div",oe,[u(k,{modelValue:s.value.password,"onUpdate:modelValue":a[3]||(a[3]=t=>s.value.password=t),"input-type":"password","input-id":"رمز عبور:","is-required":!0,placeholder:"رمز عبور را وارد کنید"},null,8,["modelValue"])]),e("div",le,[ue,M(e("select",{"onUpdate:modelValue":a[4]||(a[4]=t=>s.value.userType=t),id:"number",required:""},de,512),[[E,s.value.userType]])])]),e("div",pe,[ce,e("div",ve,[i.value?(l(),C(I,{key:0,store:"user",loading:y.value,onSelectImage:a[5]||(a[5]=t=>U())},null,8,["loading"])):p("",!0),d.value?(l(),C(I,{key:1,store:"user",loading:y.value,onSelectImage:a[6]||(a[6]=t=>{var b;return U((b=m.value)==null?void 0:b.user_id)})},null,8,["loading"])):p("",!0)])]),e("div",me,[e("button",{type:"button",onClick:a[7]||(a[7]=t=>x())},c(i.value?"ذخیره":"ویرایش"),1),e("button",{onClick:g,type:"button"},"لغو")])],32)])])):p("",!0)]),_:1}),e("div",_e,[e("div",he,[fe,e("span",ye,[e("button",{onClick:a[9]||(a[9]=t=>i.value=!0)},[u(r(N),null,{default:w(()=>[u(r(K))]),_:1})])])]),e("ul",null,[(l(!0),n(S,null,L(r(v).users,(t,b)=>(l(),n("li",{key:t.user_id,class:"item"},[e("div",ge,[e("span",be,c(b+1),1),e("div",we,[t.picture?(l(),n("img",{key:0,src:r(V).baseUrl+t.picture,alt:"",srcset:""},null,8,ke)):(l(),n("span",Ve,"No picture"))]),e("p",Ne,c(t.name)+" "+c(t.lastName),1),e("p",Ue,c(t.email),1),e("p",Ce,c(t.userType),1),e("div",Se,[e("button",{onClick:q=>T(t)},[u(r(N),{size:"20",color:"green"},{default:w(()=>[u(r(O))]),_:1})],8,Ie),e("button",{onClick:q=>D(t.user_id)},[u(r(N),{size:"20",color:"red"},{default:w(()=>[u(r(R))]),_:1})],8,Te)])])]))),128))])])],64))}});const $e=J(xe,[["__scopeId","data-v-4b04fa07"]]);export{$e as default};
