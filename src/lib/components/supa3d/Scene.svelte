<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  export let speed:number = 0.6
</script>

<T.PerspectiveCamera
  
  makeDefault
  position={[10, 0, 0]}
  fov={35}
  aspect={16 / 9}
  near={0.1}
  far={100}
>
  <OrbitControls
    autoRotate
    enableZoom={false}
    enableDamping
    
    dampingFactor={0.6}
    enablePan={false}
    autoRotateSpeed={speed}
    

  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.5}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.6} />



<!-- <ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
-->

<slot></slot>