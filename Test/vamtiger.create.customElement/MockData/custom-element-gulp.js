'use strict';

class VamtigerCreateCustomElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.innerHTML = `
            <style>
                /**
				 * Critical CSS
				 **/
				
				/**
				 * Import Start
				 **/
				
				/**
				 * Critical - Custom Selectors
				 **/
				
				/**
				 * Critical - Layout
				 **/
				
				/**
				 * Critical - Appearance
				 **/
				
				/**
				 * Critical - CSS Reset
				 **/
				
				html,
				body,
				figure,
				picture,
				source,
				img,
				h1,
				figcaption
				{
				    margin: 0;
				    padding: 0;
				}
				
				/**
				 * Import End
				 **/
				
				/**
				 * Layout Start
				 **/
				
				html,
				body
				{
				    width: 100%;
				    height: 100%;
				}
				
				#vamtiger-image-carousel
				{
				    width: 100%;
				    height: 100%;
				    position: relative;
				}
				
				#vamtiger-image-carousel::after
				{
				    content: "";
				    display: inline-block;
				    width: 100%;
				    height: 100%;
				    position: absolute;
				    left: 0;
				    top: 0;
				    z-index: 1;
				}
				
				.carousel-picture
				{
				    width: 100%;
				    height: 100%;
				    position: absolute;
				    left: 0;
				    top: 0;
				}
				
				.carousel-image
				{
				    width: 100%;
				    height: 100%;
				    position: absolute;
				    left: 0;
				    top: 0;
				}
				
				.carousel-image-title
				{
				    position: absolute;
				    left: 0;
				    bottom: 0;
				    text-align: center;
				    width: 100%;
				    z-index: 2;
				}
				
				/**
				 * Layout End
				 **/
				
				/**
				 * Appearance Start
				 **/
				
				#vamtiger-image-carousel
				{
				    color: white;
				    font-family: Nunito, sans-serif;
				    font-size: 0.7em;
				    font-weight: 300;
				    text-transform: uppercase;
				    letter-spacing: 0.05em;
				    word-spacing: 0.05em;
				}
				
				#vamtiger-image-carousel::after
				{
				    background: -webkit-linear-gradient(
				            rgba(51, 52, 61, .85) 0%, 
				            rgba(51, 52, 61, 0) 15%, 
				            rgba(51, 52, 61, 0) 75%, 
				            rgba(51, 52, 61, .85) 100%
				        );
				    background: linear-gradient(
				            rgba(51, 52, 61, .85) 0%, 
				            rgba(51, 52, 61, 0) 15%, 
				            rgba(51, 52, 61, 0) 75%, 
				            rgba(51, 52, 61, .85) 100%
				        );
				}
				
				.carousel-image
				{
				    -o-object-fit: cover;
				       object-fit: cover;
				}
				
				.carousel-image-title-text
				{
				    margin-bottom: 1em;
				}
				
				/**
				 * Appearance End
				 **//**
				 * Noncritical CSS
				 **/
				
				/**
				 * Import Start
				 **/
				
				/**
				 * Noncritical - Custom Selectors
				 **/
				
				/**
				 * Custom Selectors Start
				 **/
				
				/**
				 * Custom Selectors Start
				 **/
				
				/**
				 * Noncritical - Layout
				 **/
				
				/**
				 * Noncritical - Appearance
				 **/
				
				/**
				 * Appearance Start
				 **/
				
				/**
				 * Appearance End
				 **/
				
				/**
				 * Import End
				 **/
				
				/**
				 * Layout Start
				 **/
				
				/**
				 * Layout End
				 **/
				
				/**
				 * Appearance Start
				 **/
				
				/**
				 * Appearance End
				 **/
            </style>

            <figure id="vamtiger-image-carousel">
		        <picture class="carousel-picture">
		            <source srcset="Asset/Image/Carousel/01-carousel-image.jpg">
		            <img class="carousel-image" srcset="Asset/Image/Carousel/01-carousel-image.jpg" alt="science through art">
		        </picture>
		        <figcaption class="carousel-image-title">
		            <h1 class="carousel-image-title-text">Art Through Science</h1>
		        </figcaption>
		    </figure>
        `;
    }

    static get elementName() {
        const elementName = 'vamtiger.create.custom-element';

        return elementName;
    }
}

export default VamtigerCreateCustomElement;