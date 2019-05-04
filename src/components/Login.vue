<template>
  <Form ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        inline>
    <FormItem prop="user">
      <Input type="text"
             v-model="formInline.user"
             placeholder="Username"
             prefix="ios-person-outline" />
    </FormItem>
    <FormItem prop="password">
      <Input type="password"
             v-model="formInline.password"
             placeholder="Password"
             prefix="ios-lock-outline" />
    </FormItem>
    <FormItem>
      <Button type="primary"
              @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
