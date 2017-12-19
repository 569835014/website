<template>
    <div class="ui modal">
        <i class="close icon"></i>
        <div class="header">
            Profile Picture
        </div>
        <div class="image content">
            <slot></slot>
        </div>
        <div class="actions">
            <slot name="actions" >
                <div class="ui black  icon  button" @click.stop="cancel()">
                    <i class="remove icon"></i>
                    关闭
                </div>
                <div class="ui  negative  icon button" @click.stop="confirm()">
                    <i class="checkmark icon"></i>
                    确定
                </div>
            </slot>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'model',
    props:{
      visible:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.isVisible(this.visible)
      })
    },
    methods:{
      isVisible(visible){
        if(visible){
          $(this.$el).modal('show')
        }else{
          $(this.$el).modal('hide')
        }
      },
      cancel(){
        this.$emit('cancel');
      },
      confirm(){
        this.$emit('confirm')
      }
    },
    watch:{
      visible(newVal){
        this.isVisible(newVal)
      }
    }
  }
</script>

<style scoped>

</style>