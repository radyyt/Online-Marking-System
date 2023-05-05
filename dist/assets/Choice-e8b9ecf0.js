import{_ as N,r as g,u as Q,a as M,b as U,i as W,q as F,c as a,o as b,d as w,f as e,w as o,e as s,E as G,t as n,g as d,s as H,p as J,h as K}from"./index-23f1c135.js";import{S as L}from"./SelectExam-9f9765b2.js";import{_ as O}from"./ChoiceInput-8b002a44.js";const y=u=>(J("data-v-8e927a61"),u=u(),K(),u),P={class:"container"},X={class:"left"},Y=y(()=>s("h3",{style:{"margin-top":"0"}},"待选择",-1)),Z={class:"expand-block"},ee=y(()=>s("h4",{class:"title"},"题目详情：",-1)),te={key:0,class:"question-zone"},oe={style:{margin:"0px"}},se={id:"choices-zone"},ne={class:"choices"},le={class:"choices"},ae={class:"choices"},ce={class:"choices"},ie={key:1,class:"question-zone"},_e={style:{margin:"0px"}},de={id:"choices-zone"},re={class:"choices"},ue={class:"choices"},he={class:"choices"},fe={class:"choices"},me={class:"title"},pe={class:"one-line"},ge={class:"right"},be=y(()=>s("h3",{style:{"margin-top":"0"}},"已选择",-1)),we={class:"one-line"},ye={__name:"Choice",setup(u){const C=g(null),k=Q();M();const _=U({info:[],selected:[],current:null});W.get("choice/").then(l=>{_.info=l.data});const S=(l,c)=>c.subject_name===l,B=(l,c)=>c.type_name===l,j=l=>{_.selected=l},v=g(null),D=l=>{k.commit("saveSelected",l)},V=()=>{v.value.handleDialog(),D(_.selected)},q=F("deleteQuestion"),h=g(!1),z=l=>{G.confirm("将不会保存修改，确定要关闭吗?","Warning",{confirmButtonText:"确认",cancelButtonText:"返回",type:"warning"}).then(()=>{l()}).catch(()=>{})},E=l=>{h.value=!0,console.log(l),_.current=l};return(l,c)=>{const R=a("el-dialog"),r=a("el-col"),f=a("el-row"),i=a("el-table-column"),A=a("el-image"),m=a("el-tag"),p=a("el-button"),x=a("el-table"),I=a("CircleCheck"),T=a("el-icon");return b(),w("div",P,[e(L,{ref_key:"selectExamRef",ref:v},null,512),e(R,{modelValue:h.value,"onUpdate:modelValue":c[1]||(c[1]=t=>h.value=t),title:"编辑题目",width:"50%","before-close":z,"align-center":""},{default:o(()=>[e(O,{question:_.current,onCancelDialog:c[0]||(c[0]=t=>h.value=!1)},null,8,["question"])]),_:1},8,["modelValue"]),s("div",X,[e(f,{justify:"space-between"},{default:o(()=>[e(r,{span:4},{default:o(()=>[Y]),_:1}),e(r,{span:2})]),_:1}),e(x,{data:_.info,onSelectionChange:j,ref_key:"tableRef",ref:C},{default:o(()=>[e(i,{type:"selection",width:"35"}),e(i,{type:"expand"},{default:o(t=>[s("div",Z,[ee,t.row.image!=null?(b(),w("div",te,[e(f,{align:"middle"},{default:o(()=>[e(r,{span:18},{default:o(()=>[s("p",oe,n(t.row.body),1),s("div",se,[s("span",ne,"A:  "+n(t.row.choices_A),1),s("span",le,"B:  "+n(t.row.choices_B),1),s("span",ae,"C:  "+n(t.row.choices_C),1),s("span",ce,"D:  "+n(t.row.choices_D),1)])]),_:2},1024),e(r,{span:4,offset:2},{default:o(()=>[e(A,{fit:"contain",src:t.row.image},null,8,["src"])]),_:2},1024)]),_:2},1024)])):(b(),w("div",ie,[e(f,{align:"middle"},{default:o(()=>[e(r,null,{default:o(()=>[s("p",_e,n(t.row.body),1),s("div",de,[s("span",re,"A:  "+n(t.row.choices_A),1),s("span",ue,"B:  "+n(t.row.choices_B),1),s("span",he,"C:  "+n(t.row.choices_C),1),s("span",fe,"D:  "+n(t.row.choices_D),1)])]),_:2},1024)]),_:2},1024)])),s("h4",me,"正确答案："+n(t.row.correct_answer),1)])]),_:1}),e(i,{prop:"body",label:"题目"},{default:o(t=>[s("span",pe,n(t.row.body),1)]),_:1}),e(i,{prop:"subject",label:"学科",width:"100",filters:[{text:"数学",value:"数学"},{text:"语文",value:"语文"},{text:"政治",value:"政治"}],"filter-method":S,"filter-placement":"bottom-end","header-align":"center",align:"center"},{default:o(t=>[e(m,null,{default:o(()=>[d(n(t.row.subject_name),1)]),_:2},1024)]),_:1}),e(i,{prop:"type",label:"类型",width:"100",filters:[{text:"单项选择",value:"单项选择"},{text:"多项选择",value:"多项选择"}],"filter-method":B,"filter-placement":"bottom-end","header-align":"center",align:"center"},{default:o(t=>[e(m,null,{default:o(()=>[d(n(t.row.type_name),1)]),_:2},1024)]),_:1}),e(i,{fixed:"right",label:"操作",width:"120",align:"center"},{default:o(t=>[e(p,{link:"",type:"primary",size:"small",onClick:$=>E(t.row)},{default:o(()=>[d("编辑")]),_:2},1032,["onClick"]),e(p,{link:"",type:"danger",size:"small",onClick:$=>H(q)(t.row.url)},{default:o(()=>[d("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),s("div",ge,[be,e(x,{data:_.selected},{default:o(()=>[e(i,{prop:"body",label:"题目"},{default:o(t=>[s("span",we,n(t.row.body),1)]),_:1}),e(i,{prop:"type",label:"类型",width:"100","header-align":"center",align:"center",sortable:""},{default:o(t=>[e(m,null,{default:o(()=>[d(n(t.row.type_name),1)]),_:2},1024)]),_:1})]),_:1},8,["data"]),e(f,{justify:"end",style:{"margin-top":"15px"}},{default:o(()=>[e(p,{type:"success",onClick:V},{default:o(()=>[d(" 提交 "),e(T,{class:"el-icon--right"},{default:o(()=>[e(I)]),_:1})]),_:1})]),_:1})])])}}},ke=N(ye,[["__scopeId","data-v-8e927a61"]]);export{ke as default};