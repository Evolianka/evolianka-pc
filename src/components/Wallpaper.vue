<template>
  <canvas ref="canvas" class="wallpaper"></canvas>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'Wallpaper',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      geometry: null,
      material: null,
      plane: null,
      wireframe: null,
      loader: null,
      texture1: null,
      vertexShader: `

	      varying vec2 vUv;
	      uniform float time;
	      uniform float mouseX;
	      uniform float mouseY;
	      void main() {
		      gl_Position = projectionMatrix * modelViewMatrix * vec4(position[0], position[1] , position[2] , 1.0);
		       vUv = vec2 (gl_Position.x, gl_Position.z);
	      }`,
      fragmentShader: `
       #define USE_MAP true
	     varying vec2 vUv;
	     uniform sampler2D texture1;
	     uniform float time;

	     void main() {
		    vec2 uv = vUv;
		    uv.y = uv.y + time;

		    vec4 tex1 =  texture2D( texture1,  vec2(uv.x, uv.y) / 4.0);
    	  gl_FragColor = tex1;
	    }`
    }
  },
  methods: {
    init() {

    },
    createScene() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        alpha: true
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.createPlane()
      this.camera.position.z = 5;
      this.animate()
    },
    createPlane() {
      this.geometry = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
      this.texture1 = new THREE.TextureLoader().load(require('@/assets/img/wallpaper/bg.png'))
      this.texture1.wrapS = THREE.RepeatWrapping;
      this.texture1.wrapT = THREE.RepeatWrapping;
      this.texture1.repeat.set(10, 10);
      this.texture1.anisotropy = 10;
      this.material = new THREE.ShaderMaterial({
        fragmentShader: this.fragmentShader,
        vertexShader: this.vertexShader,
        uniforms: {
          time: {
            type: 'f',
            value: 0.01
          },
          texture1: {
            type: 't',
            value: this.texture1
          }
        },
        depthTest: false,
        side: THREE.DoubleSide,
      })
      this.plane = new THREE.Mesh(this.geometry, this.material)
      this.plane.rotation.x = -1.370
      this.scene.add(this.plane)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
      this.plane.material.uniforms.time.value += 0.03
    },
    resizer() {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  },
  mounted() {
    this.createScene()
    window.addEventListener('resize', this.resizer)
  }
}
</script>

<style lang="scss" scoped>
.wallpaper {
  width: 100vw;
  height: 100vh;
  z-index: -1;
  position: absolute;
  background: rgb(28, 19, 74) url('~@/assets/img/wallpaper/sun.png') no-repeat;
  background-position-x: center;
  background-position-y: 10%;
  background-size: 25%;
}
</style>