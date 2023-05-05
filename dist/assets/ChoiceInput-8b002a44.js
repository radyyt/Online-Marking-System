import{u as q,r as R,b as E,c as r,o as g,d as F,f as l,w as s,F as S,j as N,s as T,l as I,g as m,i as y,v as p}from"./index-23f1c135.js";const M={__name:"ChoiceInput",props:["question"],emits:["cancelDialog"],setup(V,{emit:w}){const b=V,C=q().state.subjects,_=R(null),e=E({questionUrl:"",image:{},choiceForm:{desc:"",subject:0,choices_A:"",choices_B:"",choices_C:"",choices_D:"",type:0,answer:[]},choiceFormRules:{desc:[{required:"true",message:"请输入题目",trigger:"blur"}],choices_A:[{required:"true",message:"请输入选项",trigger:"blur"}],choices_B:[{required:"true",message:"请输入选项",trigger:"blur"}],choices_C:[{required:"true",message:"请输入选项",trigger:"blur"}],choices_D:[{required:"true",message:"请输入选项",trigger:"blur"}],type:[{required:"true",message:"请选择类型",trigger:"blur"}],answer:[{required:"true",message:"请勾选正确选项",trigger:"blur"},{validator:(c,o,i)=>{e.choiceForm.type==0?o.length==1?i():i(new Error("单选题只有一个正确选项")):o.length>=2?i():i(new Error("多选题至少有两个正确选项"))},trigger:"blur"}]}}),D=c=>{e.image=c,console.log(c),console.log(e.image)},v=()=>{let c=new FormData;const o=e.questionUrl;c.append("body",e.choiceForm.desc),c.append("choices_A",e.choiceForm.choices_A),c.append("choices_B",e.choiceForm.choices_B),c.append("choices_C",e.choiceForm.choices_C),c.append("choices_D",e.choiceForm.choices_D),c.append("correct_answer",e.choiceForm.answer.toString()),c.append("subject",e.choiceForm.subject),c.append("type",e.choiceForm.type),JSON.stringify(e.image)!=="{}"&&c.append("image",e.image.raw),_.value.validate(i=>{i?(console.log("choiceForm submit!"),o!=""?y.patch(o,c,{headers:{"Content-Type":"multipart/form-data"},baseURL:""}).then(n=>{console.log(n),w("cancelDialog"),window.location.reload(),p({message:"题目修改成功！",type:"success"})},()=>{p({message:"题目修改失败！",type:"error"})}):y.post("choice/",c,{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{console.log(n),p({message:"题目录入成功！",type:"success"})},()=>{p({message:"题目录入失败！",type:"error"})})):console.log("choiceForm error submit!")})},B=c=>{c.resetFields()},A=c=>{const o=e.choiceForm;o.desc=c.body,o.choices_A=c.choices_A,o.choices_B=c.choices_B,o.choices_C=c.choices_C,o.choices_D=c.choices_D,o.answer=c.correct_answer.split(","),o.subject=c.subject,o.type=c.type,e.questionUrl=c.url};return b.question!=null&&A(b.question),(c,o)=>{const i=r("el-option"),n=r("el-select"),a=r("el-form-item"),u=r("el-input"),f=r("el-radio-button"),k=r("el-radio-group"),d=r("el-checkbox"),U=r("el-checkbox-group"),h=r("el-button"),j=r("el-upload"),x=r("el-form");return g(),F("div",null,[l(x,{model:e.choiceForm,rules:e.choiceFormRules,ref_key:"choiceFormRef",ref:_,"label-width":"100px","label-position":"left","status-icon":"","hide-required-asterisk":""},{default:s(()=>[l(a,{label:"科目"},{default:s(()=>[l(n,{modelValue:e.choiceForm.subject,"onUpdate:modelValue":o[0]||(o[0]=t=>e.choiceForm.subject=t),placeholder:"选择科目",filterable:""},{default:s(()=>[(g(!0),F(S,null,N(T(C),t=>(g(),I(i,{key:t.value,label:t.label,value:t.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(a,{label:"题目",prop:"desc"},{default:s(()=>[l(u,{modelValue:e.choiceForm.desc,"onUpdate:modelValue":o[1]||(o[1]=t=>e.choiceForm.desc=t),type:"textarea",autosize:""},null,8,["modelValue"])]),_:1}),l(a,{label:"A选项",prop:"choices_A"},{default:s(()=>[l(u,{modelValue:e.choiceForm.choices_A,"onUpdate:modelValue":o[2]||(o[2]=t=>e.choiceForm.choices_A=t)},null,8,["modelValue"])]),_:1}),l(a,{label:"B选项",prop:"choices_B"},{default:s(()=>[l(u,{modelValue:e.choiceForm.choices_B,"onUpdate:modelValue":o[3]||(o[3]=t=>e.choiceForm.choices_B=t)},null,8,["modelValue"])]),_:1}),l(a,{label:"C选项",prop:"choices_C"},{default:s(()=>[l(u,{modelValue:e.choiceForm.choices_C,"onUpdate:modelValue":o[4]||(o[4]=t=>e.choiceForm.choices_C=t)},null,8,["modelValue"])]),_:1}),l(a,{label:"D选项",prop:"choices_D"},{default:s(()=>[l(u,{modelValue:e.choiceForm.choices_D,"onUpdate:modelValue":o[5]||(o[5]=t=>e.choiceForm.choices_D=t)},null,8,["modelValue"])]),_:1}),l(a,{label:"类型",prop:"type"},{default:s(()=>[l(k,{modelValue:e.choiceForm.type,"onUpdate:modelValue":o[6]||(o[6]=t=>e.choiceForm.type=t)},{default:s(()=>[l(f,{label:0},{default:s(()=>[m("单项选择")]),_:1}),l(f,{label:1},{default:s(()=>[m("多项选择")]),_:1})]),_:1},8,["modelValue"])]),_:1}),l(a,{label:"正确答案",prop:"answer"},{default:s(()=>[l(U,{modelValue:e.choiceForm.answer,"onUpdate:modelValue":o[7]||(o[7]=t=>e.choiceForm.answer=t)},{default:s(()=>[l(d,{label:"A",name:"type"}),l(d,{label:"B",name:"type"}),l(d,{label:"C",name:"type"}),l(d,{label:"D",name:"type"})]),_:1},8,["modelValue"])]),_:1}),l(a,{label:"配图",prop:"pic"},{default:s(()=>[l(j,{action:"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15","on-change":D,"auto-upload":!1},{default:s(()=>[l(h,{type:"primary"},{default:s(()=>[m("点击此处上传图片")]),_:1})]),_:1})]),_:1}),l(a,null,{default:s(()=>[l(h,{type:"success",onClick:v},{default:s(()=>[m("提 交")]),_:1}),l(h,{type:"danger",onClick:o[8]||(o[8]=t=>B(_.value))},{default:s(()=>[m("重 置")]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}};export{M as _};
