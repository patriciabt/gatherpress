(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.React,n=window.wp.i18n,a=window.wp.data,r=window.wp.components,s=window.wp.plugins,l=window.wp.editPost,o=window.moment;var i=e.n(o);const c=window.wp.apiFetch;var m=e.n(c);const u=window.wp.element;function d(){(0,a.dispatch)("core/editor")?.editPost({meta:{_non_existing_meta:!0}})}function p(e){if("object"==typeof GatherPress)return e.split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}function g(e,t){if("object"!=typeof GatherPress)return;const n=e.split("."),a=n.pop();n.reduce(((e,t)=>{var n;return null!==(n=e[t])&&void 0!==n?n:e[t]={}}),GatherPress)[a]=t}const v=window.wp.date,_="YYYY-MM-DDTHH:mm:ss",E="YYYY-MM-DD HH:mm:ss",h=i().tz(b()).add(1,"day").set("hour",18).set("minute",0).set("second",0).format(_),f=i().tz(h,b()).add(2,"hours").format(_);function S(){return C(p("settings.dateFormat"))+" "+C(p("settings.timeFormat"))}function b(e=p("eventDetails.dateTime.timezone")){return i().tz.zone(e)?e:(0,n.__)("GMT","gatherpress")}function T(e=""){const t=/^([+-])(\d{2}):(00|15|30|45)$/,n=e.replace(t,"$1");return n!==e?"UTC"+n+parseInt(e.replace(t,"$2")).toString()+e.replace(t,"$3").replace("00","").replace("15",".25").replace("30",".5").replace("45",".75"):e}function D(e,t=null){!function(e){const t=i().tz(p("eventDetails.dateTime.datetime_end"),b()).valueOf(),n=i().tz(e,b()).valueOf();n>=t&&P(i().tz(n,b()).add(2,"hours").format(_))}(e),g("eventDetails.dateTime.datetime_start",e),"function"==typeof t&&t(e),d()}function P(e,t=null){!function(e){const t=i().tz(p("eventDetails.dateTime.datetime_start"),b()).valueOf(),n=i().tz(e,b()).valueOf();n<=t&&D(i().tz(n,b()).subtract(2,"hours").format(_))}(e),g("eventDetails.dateTime.datetime_end",e),null!==t&&t(e),d()}function w(){const e=(0,a.select)("core/editor").isSavingPost(),t=(0,a.select)("core/editor").isAutosavingPost();k()&&e&&!t&&m()({path:p("urls.eventRestApi")+"/datetime",method:"POST",data:{post_id:p("eventDetails.postId"),datetime_start:i().tz(p("eventDetails.dateTime.datetime_start"),b()).format(E),datetime_end:i().tz(p("eventDetails.dateTime.datetime_end"),b()).format(E),timezone:p("eventDetails.dateTime.timezone"),_wpnonce:p("misc.nonce")}}).then((()=>{!function(){const e="gp_event_communcation",t=(0,a.dispatch)("core/notices");t.removeNotice(e),"publish"!==(0,a.select)("core/editor").getEditedPostAttribute("status")||x()||t.createNotice("success",(0,n.__)("Send an event update to members via email?","gatherpress"),{id:e,isDismissible:!0,actions:[{onClick:()=>{z({setOpen:!0})},label:(0,n.__)("Compose Message","gatherpress")}]})}()}))}function C(e){const t={d:"DD",D:"ddd",j:"D",l:"dddd",N:"E",S:"o",w:"e",z:"DDD",W:"W",F:"MMMM",m:"MM",M:"MMM",n:"M",t:"",L:"",o:"YYYY",Y:"YYYY",y:"YY",a:"a",A:"A",B:"",g:"h",G:"H",h:"hh",H:"HH",i:"mm",s:"ss",u:"SSS",e:"zz",I:"",O:"",P:"",T:"",Z:"",c:"",r:"",U:"X"};return String(e).split("").map((e=>e in t?t[e]:e)).join("")}const z=(e,t="")=>{for(const[n,a]of Object.entries(e)){let e=n;t&&(e+="_"+String(t));const r=new CustomEvent(e,{detail:a});dispatchEvent(r)}},y=(e,t="")=>{for(const[n,a]of Object.entries(e)){let e=n;t&&(e+="_"+String(t)),addEventListener(e,(e=>{a(e.detail)}),!1)}};function k(){return"gp_event"===(0,a.select)("core/editor").getCurrentPostType()}function x(){const e=i().tz(p("eventDetails.dateTime.datetime_end"),b());return"gp_event"===(0,a.select)("core/editor")?.getCurrentPostType()&&i().tz(b()).valueOf()>e.valueOf()}function O(){const e="gp_event_past",t=(0,a.dispatch)("core/notices");t.removeNotice(e),x()&&t.createNotice("warning",(0,n.__)("This event has already past.","gatherpress"),{id:e,isDismissible:!1})}const N=()=>{const{editPost:e,unlockPostSaving:s}=(0,a.useDispatch)("core/editor"),l=(0,a.useSelect)((e=>e("core/editor").isCleanNewPost()),[]);let o=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta").enable_anonymous_rsvp),[]);l&&(o=p("settings.enableAnonymousRsvp"));const[i,c]=(0,u.useState)(o),m=(0,u.useCallback)((t=>{const n={enable_anonymous_rsvp:Number(t)};c(t),e({meta:n}),s()}),[e,s]);return(0,u.useEffect)((()=>{l&&0!==o&&m(o)}),[l,o,m]),(0,t.createElement)(r.CheckboxControl,{label:(0,n.__)("Enable Anonymous RSVP","gatherpress"),checked:i,onChange:e=>{m(e)}})},A=()=>(0,t.createElement)("section",null,(0,t.createElement)(N,null)),M=e=>{const{dateTimeStart:t}=e;return i().tz(t,b()).format(S())},Y=e=>{const{dateTimeEnd:t}=e;return i().tz(t,b()).format(S())},F=e=>{const{dateTimeStart:n,setDateTimeStart:a}=e,s=(0,v.getSettings)(),l=/a(?!\\)/i.test(s.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,t.createElement)(r.DateTimePicker,{currentDate:n,onChange:e=>D(e,a),is12Hour:l})},j=e=>{const{dateTimeEnd:n,setDateTimeEnd:a}=e,s=(0,v.getSettings)(),l=/a(?!\\)/i.test(s.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,t.createElement)(r.DateTimePicker,{currentDate:n,onChange:e=>P(e,a),is12Hour:l})},R=e=>{const{dateTimeStart:a,setDateTimeStart:s}=e;return(0,u.useEffect)((()=>{s(i().tz(function(){let e=p("eventDetails.dateTime.datetime_start");return e=""!==e?i().tz(e,b()).format(_):h,g("eventDetails.dateTime.datetime_start",e),e}(),b()).format(_)),z({setDateTimeStart:a}),O()})),(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.Flex,{direction:"column",gap:"0"},(0,t.createElement)(r.FlexItem,null,(0,t.createElement)("label",{htmlFor:"gp-datetime-start"},(0,n.__)("Start","gatherpress"))),(0,t.createElement)(r.FlexItem,null,(0,t.createElement)(r.Dropdown,{popoverProps:{placement:"bottom-end"},renderToggle:({isOpen:e,onToggle:n})=>(0,t.createElement)(r.Button,{id:"gp-datetime-start",onClick:n,"aria-expanded":e,isLink:!0},(0,t.createElement)(M,{dateTimeStart:a})),renderContent:()=>(0,t.createElement)(F,{dateTimeStart:a,setDateTimeStart:s})}))))},H=e=>{const{dateTimeEnd:a,setDateTimeEnd:s}=e;return(0,u.useEffect)((()=>{s(i().tz(function(){let e=p("eventDetails.dateTime.datetime_end");return e=""!==e?i().tz(e,b()).format(_):f,g("eventDetails.dateTime.datetime_end",e),e}(),b()).format(_)),z({setDateTimeEnd:a}),O()})),(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.Flex,{direction:"column",gap:"0"},(0,t.createElement)(r.FlexItem,null,(0,t.createElement)("label",{htmlFor:"gp-datetime-end"},(0,n.__)("End","gatherpress"))),(0,t.createElement)(r.FlexItem,null,(0,t.createElement)(r.Dropdown,{popoverProps:{placement:"bottom-end"},renderToggle:({isOpen:e,onToggle:n})=>(0,t.createElement)(r.Button,{id:"gp-datetime-end",onClick:n,"aria-expanded":e,isLink:!0},(0,t.createElement)(Y,{dateTimeEnd:a})),renderContent:()=>(0,t.createElement)(j,{dateTimeEnd:a,setDateTimeEnd:s})}))))},I=e=>{const{timezone:a,setTimezone:s}=e,l=p("misc.timezoneChoices");return(0,u.useEffect)((()=>{s(p("eventDetails.dateTime.timezone"))}),[s]),(0,u.useEffect)((()=>{z({setTimezone:p("eventDetails.dateTime.timezone")})})),(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.SelectControl,{label:(0,n.__)("Time Zone","gatherpress"),value:T(a),onChange:e=>{e=function(e=""){const t=/^UTC([+-])(\d+)(.\d+)?$/,n=e.replace(t,"$1");if(n!==e){const a=e.replace(t,"$2").padStart(2,"0");let r=e.replace(t,"$3");return""===r&&(r=":00"),r=r.replace(".25",":15").replace(".5",":30").replace(".75",":45"),n+a+r}return e}(e),s(e),g("eventDetails.dateTime.timezone",e),d()}},Object.keys(l).map((e=>(0,t.createElement)("optgroup",{key:e,label:e},Object.keys(l[e]).map((n=>(0,t.createElement)("option",{key:n,value:n},l[e][n]))))))))},L=()=>{const[e,r]=(0,u.useState)(),[s,l]=(0,u.useState)(),[o,i]=(0,u.useState)();return(0,a.subscribe)(w),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("h3",null,(0,n.__)("Date & time","gatherpress")),(0,t.createElement)(R,{dateTimeStart:e,setDateTimeStart:r}),(0,t.createElement)(H,{dateTimeEnd:s,setDateTimeEnd:l}),(0,t.createElement)(I,{timezone:o,setTimezone:i}))},G=()=>(0,t.createElement)("section",null,(0,t.createElement)(L,null)),$=()=>{const{editPost:e,unlockPostSaving:s}=(0,a.useDispatch)("core/editor"),l=(0,a.useSelect)((e=>e("core/editor").isCleanNewPost()),[]);let o=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta").max_guest_limit),[]);l&&(o=p("settings.maxGuestLimit")),!1===o&&(o=0);const[i,c]=(0,u.useState)(o),m=(0,u.useCallback)((t=>{const n={max_guest_limit:Number(t)};c(t),e({meta:n}),s()}),[e,s]);return(0,u.useEffect)((()=>{l&&0!==o&&m(o)}),[l,o,m]),(0,t.createElement)(r.__experimentalNumberControl,{label:(0,n.__)("Maximum Number of Guests","gatherpress"),value:i,min:0,max:5,onChange:e=>{m(e)}})},W=()=>(0,t.createElement)("section",null,(0,t.createElement)($,null)),B=()=>{const{editPost:e,unlockPostSaving:s}=(0,a.useDispatch)("core/editor"),l=(0,a.useSelect)((e=>e("core/editor").isCleanNewPost()),[]);let o=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta").max_attendance),[]);l&&(o=p("settings.maxAttendance"));const[i,c]=(0,u.useState)(o),m=(0,u.useCallback)((t=>{const n={max_attendance:Number(t)};c(t),e({meta:n}),s()}),[e,s]);return(0,u.useEffect)((()=>{c(o)}),[o]),(0,t.createElement)(r.__experimentalNumberControl,{label:(0,n.__)("Maximum Attending Limit","gatherpress"),value:null!=i?i:50,min:0,onChange:e=>{m(e)}})},V=()=>(0,t.createElement)("section",null,(0,t.createElement)(B,null)),J=()=>"publish"===(0,a.select)("core/editor").getEditedPostAttribute("status")&&!x()&&(0,t.createElement)("section",null,(0,t.createElement)("h3",{style:{marginBottom:"0.5rem"}},(0,n.__)("Send an event update","gatherpress")),(0,t.createElement)(r.Button,{variant:"secondary",onClick:()=>z({setOpen:!0})},(0,n.__)("Compose Message","gatherpress"))),U=()=>{const{editPost:e,unlockPostSaving:s}=(0,a.useDispatch)("core/editor"),l=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta").online_event_link)),[o,i]=(0,u.useState)(l);return y({setOnlineEventLink:i},p("eventDetails.postId")),(0,t.createElement)(r.TextControl,{label:(0,n.__)("Online event link","gatherpress"),value:o,placeholder:(0,n.__)("Add link to online event","gatherpress"),onChange:t=>{(t=>{e({meta:{online_event_link:t}}),i(t),z({setOnlineEventLink:t},p("eventDetails.postId")),s()})(t)}})},Z=()=>(0,t.createElement)("section",null,(0,t.createElement)(U,null)),X=()=>{const[e,s]=(0,u.useState)(""),[l,o]=(0,u.useState)(""),[i,c]=(0,u.useState)(""),[m,d]=(0,u.useState)(""),[p,g]=(0,u.useState)(!1),[v,_]=(0,u.useState)(""),E=(0,a.useDispatch)("core/editor").editPost,{unlockPostSaving:h}=(0,a.useDispatch)("core/editor"),f=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("_gp_venue"))),S=(0,a.useSelect)((e=>e("core").getEntityRecord("taxonomy","_gp_venue",f))),b=S?.slug.replace(/^_/,""),[T,D]=(0,u.useState)(""),P=f+":"+T,w=(0,a.useSelect)((e=>e("core").getEntityRecords("postType","gp_venue",{per_page:1,slug:T})));(0,u.useEffect)((()=>{var e,t,a,r;let l={};if(T&&Array.isArray(w)){var i;const e=null!==(i=w[0]?.meta?.venue_information)&&void 0!==i?i:"{}";var m;e&&(l=JSON.parse(e),l.name=null!==(m=w[0]?.title.rendered)&&void 0!==m?m:"")}const u=null!==(e=l?.name)&&void 0!==e?e:(0,n.__)("No venue selected.","gatherpress"),p=null!==(t=l?.fullAddress)&&void 0!==t?t:"",g=null!==(a=l?.phoneNumber)&&void 0!==a?a:"",v=null!==(r=l?.website)&&void 0!==r?r:"";b&&D(b),_(P?String(P):""),s(u),o(p),c(g),d(v),z({setName:u,setFullAddress:p,setPhoneNumber:g,setWebsite:v,setIsOnlineEventTerm:"online-event"===T})}),[T,w,b,P]);let C=(0,a.useSelect)((e=>e("core").getEntityRecords("taxonomy","_gp_venue",{per_page:-1,context:"view"})),[]);return C?(C=C.map((e=>({label:e.name,value:e.id+":"+e.slug.replace(/^_/,"")}))),C.unshift({value:":",label:(0,n.__)("Choose a venue","gatherpress")})):C=[],(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.SelectControl,{label:(0,n.__)("Venue Selector","gatherpress"),value:v,onChange:e=>{(e=>{_(e);const t=""!==(e=e.split(":"))[0]?[e[0]]:[];E({_gp_venue:t}),D(e[1]),h()})(e)},options:C}))},q=()=>(0,t.createElement)("section",null,(0,t.createElement)(X,null));(0,s.registerPlugin)("gp-event-settings",{render:()=>k()&&(0,t.createElement)(l.PluginDocumentSettingPanel,{name:"gp-event-settings",title:(0,n.__)("Event settings","gatherpress"),initialOpen:!0,className:"gp-event-settings"},(0,t.createElement)(r.__experimentalVStack,{spacing:6},(0,t.createElement)(G,null),(0,t.createElement)(q,null),(0,t.createElement)(Z,null),(0,t.createElement)(W,null),(0,t.createElement)(V,null),(0,t.createElement)(A,null),(0,t.createElement)(J,null)))}),(0,a.dispatch)("core/edit-post").toggleEditorPanelOpened("gp-event-settings/gp-event-settings");const K=()=>{var e,s,l;const o=(0,a.useDispatch)("core/editor").editPost,i=(e,t)=>{const n=JSON.stringify({...c,[e]:t});o({meta:{venue_information:n}})};let c=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta").venue_information));c=c?JSON.parse(c):{};const[m,d]=(0,u.useState)(null!==(e=c.fullAddress)&&void 0!==e?e:""),[p,g]=(0,u.useState)(null!==(s=c.phoneNumber)&&void 0!==s?s:""),[v,_]=(0,u.useState)(null!==(l=c.website)&&void 0!==l?l:"");return y({setFullAddress:d,setPhoneNumber:g,setWebsite:_}),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(r.TextControl,{label:(0,n.__)("Full Address","gatherpress"),value:m,onChange:e=>{z({setFullAddress:e}),i("fullAddress",e)}}),(0,t.createElement)(r.TextControl,{label:(0,n.__)("Phone Number","gatherpress"),value:p,onChange:e=>{z({setPhoneNumber:e}),i("phoneNumber",e)}}),(0,t.createElement)(r.TextControl,{label:(0,n.__)("Website","gatherpress"),value:v,type:"url",onChange:e=>{z({setWebsite:e}),i("website",e)}}))},Q=()=>(0,t.createElement)("section",null,(0,t.createElement)(K,null));(0,s.registerPlugin)("gp-venue-settings",{render:()=>"gp_venue"===(0,a.select)("core/editor")?.getCurrentPostType()&&(0,t.createElement)(l.PluginDocumentSettingPanel,{name:"gp-venue-settings",title:(0,n.__)("Venue settings","gatherpress"),initialOpen:!0,className:"gp-venue-settings"},(0,t.createElement)(r.__experimentalVStack,{spacing:6},(0,t.createElement)(Q,null)))}),(0,a.dispatch)("core/edit-post").toggleEditorPanelOpened("gp-venue-settings/gp-venue-settings")})();