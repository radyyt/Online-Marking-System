import{_ as N,r as h,u as Q,a as T,b as F,i as M,q as U,c as s,o as W,d as A,f as e,w as t,e as n,E as G,g as d,t as i,s as H,p as J,h as K}from"./index-23f1c135.js";import{S as L}from"./SelectExam-9f9765b2.js";import{_ as O}from"./BlankInput-21d5b9a8.js";const m=r=>(J("data-v-2334012c"),r=r(),K(),r),P={class:"container"},X={class:"left"},Y=m(()=>n("h3",{style:{"margin-top":"0"}},"待选择",-1)),Z={class:"expand-block"},ee=m(()=>n("h4",{class:"title"},"题目详情：",-1)),te={class:"question-zone"},oe={style:{margin:"0px"}},le=m(()=>n("h4",{class:"title"},"正确答案：",-1)),ne={class:"question-zone"},se={style:{margin:"0px"}},ae={style:{margin:"0px"}},ce={style:{margin:"0px"}},ie={class:"one-line"},_e={class:"right"},de=m(()=>n("h3",{style:{"margin-top":"0"}},"已选择",-1)),re={class:"one-line"},ue={__name:"Blank",setup(r){const b=h(),w=Q();T();const a=F({info:[],selected:[],current:null});M.get("blank/").then(l=>{a.info=l.data});const x=(l,c)=>c.subject_name===l,k=l=>{a.selected=l},y=h(null),C=l=>{w.commit("saveSelected",l)},S=()=>{y.value.handleDialog(),a.selected.forEach(l=>l.type=2),console.log(a.selected),C(a.selected)},B=()=>{b.value.clearFilter()},j=U("deleteQuestion"),u=h(!1),E=l=>{G.confirm("将不会保存修改，确定要关闭吗?","Warning",{confirmButtonText:"确认",cancelButtonText:"返回",type:"warning"}).then(()=>{l()}).catch(()=>{})},V=l=>{u.value=!0,console.log(l),a.current=l};return(l,c)=>{const q=s("el-dialog"),f=s("el-col"),p=s("el-button"),g=s("el-row"),_=s("el-table-column"),R=s("el-image"),$=s("el-tag"),v=s("el-table"),z=s("CircleCheck"),I=s("el-icon");return W(),A("div",P,[e(L,{ref_key:"selectExamRef",ref:y},null,512),e(q,{modelValue:u.value,"onUpdate:modelValue":c[1]||(c[1]=o=>u.value=o),title:"编辑试卷",width:"50%","before-close":E,"align-center":""},{default:t(()=>[e(O,{question:a.current,onCancelDialog:c[0]||(c[0]=o=>u.value=!1)},null,8,["question"])]),_:1},8,["modelValue"]),n("div",X,[e(g,{justify:"space-between"},{default:t(()=>[e(f,{span:4},{default:t(()=>[Y]),_:1}),e(f,{span:2},{default:t(()=>[e(p,{onClick:c[2]||(c[2]=o=>B()),type:"danger"},{default:t(()=>[d("清除筛选")]),_:1})]),_:1})]),_:1}),e(v,{data:a.info,onSelectionChange:k,ref_key:"tableRef",ref:b},{default:t(()=>[e(_,{type:"selection",width:"35"}),e(_,{type:"expand"},{default:t(o=>[n("div",Z,[ee,n("div",te,[e(g,{align:"middle"},{default:t(()=>[e(f,{span:14},{default:t(()=>[n("p",oe,i(o.row.body),1)]),_:2},1024),e(f,{span:8,offset:2},{default:t(()=>[e(R,{fit:"fill",src:o.row.image},null,8,["src"])]),_:2},1024)]),_:2},1024)]),le,n("div",ne,[n("p",se," 1.   "+i(o.row.correct_answer_1),1),n("p",ae," 2.   "+i(o.row.correct_answer_2),1),n("p",ce," 3.   "+i(o.row.correct_answer_3),1)])])]),_:1}),e(_,{prop:"body",label:"题目"},{default:t(o=>[n("span",ie,i(o.row.body),1)]),_:1}),e(_,{prop:"subject",label:"学科",width:"100",filters:[{text:"数学",value:"数学"},{text:"语文",value:"语文"},{text:"政治",value:"政治"}],"filter-method":x,"filter-placement":"bottom-end","header-align":"center",align:"center"},{default:t(o=>[e($,null,{default:t(()=>[d(i(o.row.subject_name),1)]),_:2},1024)]),_:1}),e(_,{fixed:"right",label:"操作",width:"120",align:"center"},{default:t(o=>[e(p,{link:"",type:"primary",size:"small",onClick:D=>V(o.row)},{default:t(()=>[d("编辑")]),_:2},1032,["onClick"]),e(p,{link:"",type:"danger",size:"small",onClick:D=>H(j)(o.row.url)},{default:t(()=>[d("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),n("div",_e,[de,e(v,{data:a.selected},{default:t(()=>[e(_,{prop:"body",label:"题目"},{default:t(o=>[n("span",re,i(o.row.body),1)]),_:1})]),_:1},8,["data"]),e(g,{justify:"end",style:{"margin-top":"15px"}},{default:t(()=>[e(p,{type:"success",onClick:S},{default:t(()=>[d(" 提交 "),e(I,{class:"el-icon--right"},{default:t(()=>[e(z)]),_:1})]),_:1})]),_:1})])])}}},ge=N(ue,[["__scopeId","data-v-2334012c"]]);export{ge as default};
