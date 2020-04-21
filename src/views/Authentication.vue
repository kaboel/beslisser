<template>
  <v-container>
    <div class="auth-area">
      <div class="auth-window">
        <div class="auth-sections">
          <img class="responsive" src="../assets/logo-grad.png">
          <v-divider vertical/>
        </div>
        <div class="auth-sections text-center">
          <p class="vertical">Voor en optimale beslissing</p>
            <v-tabs v-model="activeTab"
                    grow>
              <v-tab-item key="1" value="loginForm">
                <div class="auth-form">
                  <p class="display-3 font-weight-thin">
                    Sign In
                  </p>
                  <v-form ref="loginForm"
                          v-model="forms.loginForm.isValid">
                    <v-text-field type="text"
                                  label="Email"
                                  v-model="forms.loginForm.email"
                                  :rules="forms.rules.emailRules"/>
                    <v-text-field :type="forms.showPassword ? 'text' : 'password'"
                                  label="Password"
                                  v-model="forms.loginForm.password"
                                  :rules="forms.rules.passwordRules"
                                  :append-icon="forms.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  @click:append="forms.showPassword = !forms.showPassword"/>
                    <v-row class="mt-2">
                      <v-col>
                        <v-btn class="mr-4 primary"
                               @click="userLogin"
                               v-on:keyup.enter="userLogin">
                          Let's go!
                        </v-btn>
                        <v-btn class="error--text"
                               @click="resetForm('loginForm')">
                          Clear
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="text-center mt-2">
                        <span class="subtitle-1 grey--text">Or</span>
                        <v-btn text width="100%"
                               @click="switchTab('registerForm')">
                          Create account
                          <v-icon class="ml-2">mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
              </v-tab-item>
              <v-tab-item key="2" value="registerForm">
                <div class="auth-form">
                  <v-row justify="center" align="center">
                    <v-col>
                      <span class="display-1 font-weight-thin">Sign Up</span>
                    </v-col>
                    <v-col class="text-right">
                      <v-btn fab x-small
                             text @click="switchTab('loginForm')"
                             color="red">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-form ref="registerForm"
                          v-model="forms.registerForm.isValid">
                    <v-text-field type="text"
                                  label="Name"
                                  v-model="forms.registerForm.name"
                                  :rules="forms.rules.nameRules"/>
                    <v-text-field type="text"
                                  label="Email"
                                  v-model="forms.registerForm.email"
                                  :rules="forms.rules.emailRules"/>
                    <v-text-field :type="forms.showNewPassword ? 'text' : 'password'"
                                  label="Password"
                                  v-model="forms.registerForm.password"
                                  :rules="forms.rules.passwordRules"
                                  :append-icon="forms.showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  @click:append="forms.showNewPassword = !forms.showNewPassword"/>
                    <v-text-field :type="forms.showVerification ? 'text' : 'password'"
                                  label="Verify Password"
                                  v-model="forms.registerForm.passwordVerify"
                                  :rules="verifyPasswordRule"
                                  :append-icon="forms.showVerification ? 'mdi-eye' : 'mdi-eye-off'"
                                  @click:append="forms.showVerification = !forms.showVerification"/>
                    <v-row class="mt-2">
                      <v-col class="text-right">
                        <v-btn class="mr-4 success"
                               @click="userRegister">
                          Sign Up
                        </v-btn>
                        <v-btn class="error--text"
                               @click="resetForm('registerForm')">
                          Clear
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
              </v-tab-item>
            </v-tabs>
        </div>
      </div>
    </div>

    <v-snackbar v-model="alert.active"
                :color="alert.type"
                :timeout=3000
                multi-line
                top right>
      <v-icon v-if="alert.type==='warning'">mdi-alert</v-icon>
      <v-icon v-if="alert.type==='error'">mdi-alert-circle</v-icon>
      {{ alert.msg }}
      <v-btn  dark text
              small color="red"
              @click="alert.active = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import service from '../helpers/service'

  export default {
    name: "Authentication",
    data: () => ({
      activeTab: "loginForm",
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
          ],
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
          passwordRules: [
            v => !!v || 'Password is required',
          ]
        },
        showPassword: false,
        showNewPassword: false,
        showVerification: false,
      },
      alert: {
        active: false,
        type: 'info',
        msg: ""
      }
    }),
    computed: {
      ...mapGetters({
        isAuthenticated: 'getAuthState'
      }),
      verifyPasswordRule () {
        let password = this.forms.registerForm.password;
        let rePassword = this.forms.registerForm.passwordVerify;
        return [
          !!rePassword || 'Password verification is required.',
          password === rePassword || 'Password don\'t match.'
        ]
      }
    },
    methods: {
      ...mapActions ({
        setAuthentication: 'setAuthentication',
        setUser: 'setUser',
      }),
      resetForm(ref) {
        this.$refs[ref].reset()
      },
      switchTab (tab) {
        let prev = this.activeTab;
        this.resetForm(prev);
        this.activeTab = tab;
      },
      userLogin () {
        this.$refs.loginForm.validate();
        if (this.forms.loginForm.isValid) {
          let data = {
            email: this.forms.loginForm.email,
            password: this.forms.loginForm.password
          }
          service.login(data).then(res => {
            this.setAuthentication(res.data.access_token)
            service.getUser().then(res => {
              this.setUser(res.data)
              this.$router.push('/')
            }).catch(err => {
              this.alert = {
                active: true,
                type: 'error',
                msg: 'An error has occurred while logging in.'
              }
              console.log(err)
            })
          }).catch(err => {
            this.forms.loginForm.password = ""
            this.alert = {
              active: true,
              type: 'error',
              msg: 'Email or Password invalid.'
            }
            console.log(err)
          })
        } else {
          this.alert = {
            active: true,
            type: 'warning',
            msg: 'All fields cannot be blank.'
          }
        }
      },
      userRegister () {
        this.$refs.registerForm.validate();
        if (this.forms.registerForm.isValid) {
          this.alert = {
            active: true,
            type: 'success',
            msg: "Pass"
          }
        } else {
          this.alert = {
            active: true,
            type: 'warning',
            msg: 'All fields cannot be blank.'
          }
        }
      },
    }
  }
</script>

<style scoped>
  .auth-area {
    /*border: 1px solid black;*/
    min-height: 89vh;
    display: flex;
    justify-content: center;
    align-items: start;
  }
  .auth-window {
    max-width: 1000px;
    min-width: 1000px;
    margin: 20px;
    margin-top: 10%;
    padding: 20px;
    font-weight: 600;
    font-size: .9rem;
    display: flex;
    justify-content: center;
    /*border: 1px solid black;*/
  }
  .auth-sections img {
    width: 400px;
  }
  .v-application .title{
    font-family: 'Ubuntu', sans-serif !important;
  }
  p.vertical {
    width: 100%;
    writing-mode: vertical-lr !important;
    text-orientation: mixed !important;
    font-size: 20px;
    color: #ddd;
  }
  .auth-sections  {
    display: flex;
    align-items: center;
  }
  .auth-form{
    text-align: left;
    width: 325px;
    margin-left: 50px;
    padding-bottom: 50px;

    height: 450px;
  }
</style>
