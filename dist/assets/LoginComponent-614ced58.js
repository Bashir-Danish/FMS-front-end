import{d as m,r as i,o as v,c as h,a as e,b as p,l as f,B as b,s as V,p as g,h as x,_ as y}from"./index-a26e63e3.js";import{_ as B}from"./image-f74fd447.js";import{B as r}from"./baseinput-3ed4da1f.js";import{u as C}from"./auth-2de3c03d.js";/* empty css                                                                  */const l=a=>(g("data-v-0ddba67e"),a=a(),x(),a),S={class:"auth-container"},k=l(()=>e("div",{class:"circle-container"},[e("img",{src:B,alt:""}),e("div",{class:"circle"})],-1)),w={class:"auth-form"},I=l(()=>e("h1",null,"!خوش آمدید",-1)),L=l(()=>e("p",null,"لطفاً اطلاعات خود را وارد کنید",-1)),N={class:"options"},U=["value"],q=l(()=>e("p",null,"فراموشی رمز عبور",-1)),D=m({__name:"LoginComponent",setup(a){const c=C(),n=i(""),d=i(""),s=i(!1),_=async u=>{u.preventDefault(),await c.login(n.value,d.value,s.value)};return(u,o)=>(v(),h("div",S,[k,e("div",w,[e("form",null,[I,L,p(r,{modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=t=>n.value=t),"input-type":"email","input-id":"ایمیل:","is-required":!0,placeholder:"ایمیل خود را وارد کنید"},null,8,["modelValue"]),p(r,{modelValue:d.value,"onUpdate:modelValue":o[1]||(o[1]=t=>d.value=t),"input-type":"password","input-id":"رمز عبور:","is-required":!0,placeholder:"رمز عبور خود را وارد کنید"},null,8,["modelValue"]),e("button",{onClick:_},"ورود"),e("div",N,[e("label",null,[f(e("input",{type:"checkbox","onUpdate:modelValue":o[2]||(o[2]=t=>s.value=t),value:s.value},null,8,U),[[b,s.value]]),V(" مرا به خاطر بسپار به مدت 20 روز ")]),q])])])]))}});const z=y(D,[["__scopeId","data-v-0ddba67e"]]);export{z as default};
