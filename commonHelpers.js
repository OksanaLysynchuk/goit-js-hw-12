import{a as w,S as E,i as S}from"./assets/vendor-64b55ca9.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const v="42752010-70402d91d951665a6458bc92c",q="https://pixabay.com/api/";async function M(e,n=1,s=15){try{return(await w.get(q,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:s}})).data.hits}catch(a){return console.log("Error while fetching images from pixabay!",a),showErrorToast("Error while fetching images from pixabay!"),a}}function g(e){const n=document.querySelector(".gallery"),s=document.createDocumentFragment();e.forEach(t=>{const r=document.createElement("div");r.classList.add("card");const o=document.createElement("a");o.href=t.largeImageURL,o.classList.add("gallery-item");const i=document.createElement("img");i.src=t.webformatURL,i.alt=t.tags,i.classList.add("gallery-image"),o.appendChild(i),r.appendChild(o),s.appendChild(r)}),n.innerHTML="",n.appendChild(s),new E(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function x(){const e=document.querySelector(".loader");e.style.display="block"}function h(){const e=document.querySelector(".loader");e.style.display="none"}function f(){const e=document.querySelector(".load-more");e.classList.add("hidden"),e.style.visibility="hidden"}function p(){const e=document.querySelector(".load-more");e.classList.remove("hidden"),e.style.visibility="visible"}function I(){const e=document.querySelector(".end-message");e.classList.remove("hidden"),e.style.visibility="visible"}function B(){const e=document.querySelector(".end-message");e.classList.add("hidden"),e.style.visibility="hidden"}function l(e){S.error({title:"Error",message:e,position:"topRight"})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".search-page"),n=document.querySelector(".search-placeholder"),s=document.querySelector(".load-more"),a=document.querySelector(".spinner");document.querySelector(".end-message").classList.add("hidden");let r=1,o="",i=[];async function y(c,u){try{return await M(c,u)}catch(d){throw d}}async function L(c){c.preventDefault();const u=document.querySelector(".gallery");u.innerHTML="";const d=n.value.trim();if(f(),B(),!d){l("Please enter a search term");return}o=d,r=1,x();try{const m=await y(d,r);h(),m.length===0?l("Sorry, there are no images matching your search query. Please try again!"):(g(m),p())}catch{h(),l("Error while fetching images from pixabay!")}}e.addEventListener("submit",L);async function b(){s.disabled=!0,a.classList.remove("hidden"),r++;try{const c=await y(o,r);c.length===0?(f(),I()):(i=i.concat(c),g(i),p())}catch{l("Error while fetching images from pixabay!")}finally{h(),s.disabled=!1,a.classList.add("hidden"),window.scrollBy({top:window.innerHeight*2,behavior:"smooth"})}}s.addEventListener("click",b)});
//# sourceMappingURL=commonHelpers.js.map
