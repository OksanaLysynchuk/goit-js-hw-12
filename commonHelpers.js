import{a as p,S as L,i as w}from"./assets/vendor-64b55ca9.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const b="42752010-70402d91d951665a6458bc92c",E="https://pixabay.com/api/";async function S(r,n=1,s=15){try{return(await p.get(E,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:s}})).data.hits}catch(o){return showErrorToast("Error while fetching images from pixabay!"),console.log("Error while fetching images from pixabay!",o),o}}function h(r){const n=document.querySelector(".gallery");n.innerHTML="",r.forEach(o=>{const e=document.createElement("div");e.classList.add("card");const t=document.createElement("a");t.href=o.largeImageURL,t.classList.add("gallery-item");const a=document.createElement("img");a.src=o.webformatURL,a.alt=o.tags,t.appendChild(a),e.appendChild(t),n.appendChild(e)}),new L(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function M(){const r=document.querySelector(".loader");r.style.display="block"}function u(){const r=document.querySelector(".loader");r.style.display="none"}function q(){document.querySelector(".load-more").classList.add("hidden")}function m(){document.querySelector(".load-more").classList.remove("hidden")}function d(r){w.error({title:"Error",message:r,position:"topRight"})}document.addEventListener("DOMContentLoaded",function(){const r=document.querySelector(".search-page"),n=document.querySelector(".search-placeholder"),s=document.querySelector(".gallery"),o=document.querySelector(".load-more");r.addEventListener("submit",f);let e=1,t="";async function a(i,c){try{return(await S(i,c)).hits}catch{return d("Error while fetching images from pixabay!"),[]}}async function f(i){i.preventDefault(),s.innerHTML="";const c=n.value.trim();if(!c){d("Please enter a search term");return}t=c,e=1,M();try{const l=await a(c,e);u(),l.length===0?d("Sorry, there are no images matching your search query. Please try again!"):(h(l),m())}catch{u(),d("Error while fetching images from pixabay!")}}o.addEventListener("click",y);function y(){o.disabled=!0,spinner.classList.remove("hidden"),e++,a(t,e).then(i=>{i.length===0?(q(),g()):(h(i),m())}).finally(()=>{u(),o.disabled=!1,window.scrollBy({top:window.innerHeight*2,behavior:"smooth"})})}function g(){endMessage.classList.remove("hidden")}});
//# sourceMappingURL=commonHelpers.js.map
