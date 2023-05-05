import{u as I,r as L,b as T,c as r,o as m,d as b,f as o,w as n,F,j as v,s as z,l as w,g as p,i as y,v as _}from"./index-23f1c135.js";const O={__name:"BlankInput",props:["question"],emits:["cancelDialog"],setup(V,{emit:j}){const f=V,h=I().state.subjects,i=L(null),e=T({questionUrl:"",image:{},blankForm:{desc:"",subject:0,num:1,answer:[{key:1,value:""}]},blankFormRules:{desc:[{required:!0,message:"请输入题目",trigger:"blur"}]}}),k=!1,U=()=>{e.blankForm.num==3&&(k=!0),e.blankForm.num+=1,e.blankForm.answer.push({key:e.blankForm.num,value:""})},x=l=>{e.image=l,console.log(l),console.log(e.image)},C=()=>{let l=new FormData;const a=e.questionUrl;l.append("body",e.blankForm.desc),l.append("blanks_num",e.blankForm.num),l.append("subject",e.blankForm.subject),JSON.stringify(e.image)!=="{}"&&l.append("image",e.image.raw);for(let s=0;s<e.blankForm.num;s++)l.append("correct_answer_"+(s+1),e.blankForm.answer[s].value);i.value.validate(s=>{s&&(a!=""?y.put(a,l,{headers:{"Content-Type":"multipart/form-data"},baseURL:""}).then(c=>{console.log(c),j("cancelDialog"),window.location.reload()},()=>{_({message:"题目修改失败！",type:"error"})}):y.post("blank/",l).then(c=>{_({message:"题目录入成功！",type:"success"})},c=>{_({message:"题目录入失败！",type:"error"})}))})},B=l=>{l.resetFields()},D=l=>{const a=e.blankForm;a.desc=l.body,a.subject=l.subject,a.answer[0].value=l.correct_answer_1,l.correct_answer_2!=null&&(a.num=2,a.answer.push({key:2,value:l.correct_answer_2})),l.correct_answer_3!=null&&(a.num=3,a.answer.push({key:3,value:l.correct_answer_3})),e.questionUrl=l.url};return f.question!=null&&D(f.question),(l,a)=>{const s=r("el-option"),c=r("el-select"),u=r("el-form-item"),g=r("el-input"),d=r("el-button"),R=r("el-tooltip"),N=r("el-upload"),S=r("el-form");return m(),b("div",null,[o(S,{model:e.blankForm,rules:e.blankFormRules,ref_key:"blankFormRef",ref:i,"label-width":"100px","label-position":"left","status-icon":"","hide-required-asterisk":""},{default:n(()=>[o(u,{label:"科目"},{default:n(()=>[o(c,{modelValue:e.blankForm.subject,"onUpdate:modelValue":a[0]||(a[0]=t=>e.blankForm.subject=t),placeholder:"选择科目",filterable:""},{default:n(()=>[(m(!0),b(F,null,v(z(h),t=>(m(),w(s,{key:t.value,label:t.label,value:t.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(u,{label:"题目",prop:"desc"},{default:n(()=>[o(g,{modelValue:e.blankForm.desc,"onUpdate:modelValue":a[1]||(a[1]=t=>e.blankForm.desc=t),type:"textarea",autosize:""},null,8,["modelValue"])]),_:1}),(m(!0),b(F,null,v(e.blankForm.answer,(t,q)=>(m(),w(u,{key:t.key,label:"答案 "+t.key,prop:"answer["+q+"].value",rules:{required:!0,message:"请输入答案",trigger:"blur"}},{default:n(()=>[o(g,{modelValue:t.value,"onUpdate:modelValue":E=>t.value=E},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label","prop"]))),128)),o(u,null,{default:n(()=>[o(R,{effect:"dark",content:"最多可有3处填空",placement:"right"},{default:n(()=>[o(d,{onClick:U,disabled:k},{default:n(()=>[p("添加答案")]),_:1})]),_:1})]),_:1}),o(u,{label:"配图",prop:"pic"},{default:n(()=>[o(N,{action:"#","on-change":x,"auto-upload":!1},{default:n(()=>[o(d,{type:"primary"},{default:n(()=>[p("点击此处上传图片")]),_:1})]),_:1})]),_:1}),o(u,null,{default:n(()=>[o(d,{type:"success",onClick:C},{default:n(()=>[p("提 交")]),_:1}),o(d,{type:"danger",onClick:a[2]||(a[2]=t=>B(i.value))},{default:n(()=>[p("重 置")]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}};export{O as _};