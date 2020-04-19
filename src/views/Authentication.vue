<template>
  <v-container fluid class="justify-center" align="center">
    <v-row justify="center"
           align="center"
           class="main-container">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="2" sm="2" class="mr-0 pr-0">
            <v-img src="../assets/logo-grad.png"/>
          </v-col>
          <v-divider vertical/>
          <span class="title">
            Voor een optimale beslissing.
          </span>
          <v-col cols="4" sm="4" class="ml-0 pl-0 fixed-height">
            <v-tabs v-model="activeTab"
                    grow>
              <v-tab-item key="1" value="sign-in">
                <v-container class="px-10">
                  <span class="display-3 font-weight-thin">Sign In</span>
                  <v-form class="mt-7 px-7"
                          v-model="forms.loginForm.isValid">
                    <v-text-field type="text"
                                  label="Email"
                                  v-model="forms.loginForm.email"
                                  :rules="forms.rules.emailRules"/>
                    <v-text-field type="password"
                                  label="Password"
                                  v-model="forms.loginForm.password"
                                  :rules="forms.rules.passwordRules"/>
                    <div class="mt-5">
                      <v-btn class="mr-4 primary">Let's go!</v-btn>
                      <v-btn class="error--text">Clear</v-btn>
                    </div>

                    <div class="mt-10 text-right">
                      <v-btn text @click="activeTab='register'">
                        Create account
                        <v-icon class="ml-2">mdi-arrow-right</v-icon>
                      </v-btn>
                    </div>
                  </v-form>
                </v-container>
              </v-tab-item>
              <v-tab-item key="2" value="register">
                <v-container class="px-10">
                  <span class="display-1 font-weight-thin">Create new account</span>
                  <v-form class="mt-5 px-7 text-center"
                          v-model="forms.registerForm.isValid">
                    <v-text-field type="text"
                                  label="Name"
                                  v-model="forms.registerForm.name"
                                  :rules="forms.rules.nameRules"/>
                    <v-text-field type="text"
                                  label="Email"
                                  v-model="forms.registerForm.email"
                                  :rules="forms.rules.emailRules"/>
                    <v-text-field type="password"
                                  label="Password"
                                  v-model="forms.registerForm.password"
                                  :rules="forms.rules.passwordRules"/>
                    <v-text-field type="password"
                                  label="Verify Password"
                                  v-model="forms.registerForm.passwordVerify"
                                  :rules="[forms.rules.verifyPasswordRules]"/>
                    <v-row class="mt-4">
                      <v-col class="text-left">
                        <v-btn class="mr-4 success">Sign Up</v-btn>
                        <v-btn class="error--text">Clear</v-btn>
                      </v-col>
                      <v-col class="text-right" @click="activeTab='sign-in'">
                        <v-btn class="error">Cancel</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" class="copyright">
      <v-col cols="8" sm="8" class="text-center pb-10">
        <span class="subtitle-1 grey--text">
          Copyright
          <v-icon>mdi-copyright</v-icon>
          {{ year() }}
          <code>_wawinkTeam</code>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Authentication",
    data: () => ({
      activeTab: "sign-in",
      forms:  {
        loginForm: {
          isValid: false,
          email:  "",
          password: ""
        },
        registerForm: {
          isValid: false,
          name: "",
          email: "",
          password: "",
          passwordVerify: "",
        },
        rules: {
          nameRules: [
            v => !!v || 'Name is required',
            v => v.length >= 3 || 'Name must be at least 3 characters',
          ],
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
          passwordRules: [
            v => !!v || 'Password is required',
          ],
          verifyPasswordRules: [
            v => !!v || 'Password verification is required',
            v => v === this.forms.registerForm.password || 'Password don\'t match'
          ],
        }
      }
    }),
    computed: {
      verifyPasswordRule () {
        let password = this.forms.registerForm.password;
        let rePassword = this.forms.registerForm.passwordVerify;

      }
    },
    methods: {
      year () {
        let date = new Date();
        return date.getFullYear();
      }
    }
  }
</script>

<style scoped>
  .v-application .title{
    font-family: 'Ubuntu', sans-serif !important;
  }
  .main-container {
    margin-top: 7%;
  }
  .title {
    writing-mode: vertical-lr !important;
    text-orientation: mixed !important;
    color: #ddd;
  }
  .fixed-height {
    height: 45vh;
  }
  .copyright {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
</style>
