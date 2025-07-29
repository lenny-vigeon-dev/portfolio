<script lang="ts">
  import { primary_gradient } from '$utils/styles';
</script>

<div class={"absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"}>
    <div class={"w-6 h-10 border-2 rounded-full flex justify-center border-red-600 dark:border-blue-600"}>
        <div class={primary_gradient + "w-1 h-3 rounded-full mt-2 animate-pulse"}></div>
    </div>
</div>
