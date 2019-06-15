/*eslint-disable*/

import * as THREE from "three";
import {TimelineMax, Power2} from "gsap";
import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";

const OrbitControls = require("three-orbit-controls")(THREE);



const config = [
	{
		page: "homepage",
		texture: THREE.ImageUtils.loadTexture("img/4.jpg")
	},
	{
		page: "about",
		texture: THREE.ImageUtils.loadTexture("img/1.jpg")
	},
	{
		page: "contact",
		texture: THREE.ImageUtils.loadTexture("img/2.jpg")
	},
	{
		page: "blog",
		texture: THREE.ImageUtils.loadTexture("img/3.jpg")
	},
];




export default class Antoni {
	constructor(){
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.container = document.getElementById("container");

		this.container.appendChild(this.renderer.domElement);

		this.camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.001,
			100
		);

		this.camera.position.set( 0, 0, 1 );

		this.add();
		this.resize();
		this.play();
	}

	goto(page, time){
		const that = this;

		let gotoPage = config.find(o => {
			return o.page == page;
		})
		that.material.uniforms.texture2.value = gotoPage.texture;

		let tl = new TimelineMax({
			onComplete: () => {
				that.material.uniforms.progress.value = 0;
				that.material.uniforms.texture1.value = gotoPage.texture;
			}
		});
		tl.to(that.material.uniforms.progress, time, {
			value: 1
		})

		// console.log(gotoPage, "going to the page");
	}

	resize(){
		const that = this;

		window.addEventListener("resize", resize);

		function resize() {
			const w = window.innerWidth;
			const h = window.innerHeight;
			that.renderer.setSize(w, h);
			that.camera.aspect = w / h;

			that.material.uniforms.uvRate1.value.y = h / w;

			const dist = that.camera.position.z - that.plane.position.z;
			const height = 1;
			that.camera.fov = 2 * (180 / Math.PI) * Math.atan( height / ( 2 * dist ) );

			that.plane.scale.x = w / h ;

			that.camera.updateProjectionMatrix();
		}
		resize()
	}

	add(){
		this.material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			uniforms: {
				time: { type: "f", value: 0 },
				pixels: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
				accel: { type: "v2", value: new THREE.Vector2(0.5, 2) },
				progress: { type: "f", value: 0 },
				uvRate1: { value: new THREE.Vector2(1, 1) },
				texture1: { value: THREE.ImageUtils.loadTexture("img/1.jpg") },
				texture2: { value: THREE.ImageUtils.loadTexture("img/2.jpg") },
			},
			vertexShader: vertex,
			fragmentShader: fragment
		});

		this.plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), this.material);

		this.scene.add(this.plane);
	}

	stop(){
		this.paused = true;
	}

	play(){
		this.paused = false;
		this.render();
	}

	render(){
		if ( this.paused ) return;
		this.time += 0.05;
		this.material.uniforms.time.value = this.time;
		requestAnimationFrame(this.render.bind(this));
		this.renderer.render(this.scene, this.camera);
	}
};




























