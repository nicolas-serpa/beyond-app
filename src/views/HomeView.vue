<template>
  <v-app>
    <v-main class="home-wrapper">
      <template>
        <v-data-table
          :headers="headers"
          :items="alunos"
          hide-default-footer
          sort-by="matricula"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Alunos</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Novo
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.nome"
                            label="Aluno"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.matricula"
                            label="Matrícula"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.email"
                            label="email"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.telefone"
                            label="Telefone"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Tem certeza que quer deletar esse item?</v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </template>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Aluno',
          align: 'start',
          sortable: false,
          value: 'nome',
        },
        { text: 'Matrícula', value: 'matricula' },
        { text: 'email', value: 'email' },
        { text: 'Telefone', value: 'telefone' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      alunos: [],
      editedIndex: -1,
      editedItem: {
        nome: '',
        matricula: 0,
        email: 0,
        telefone: 0,
      },
      defaultItem: {
        nome: '',
        matricula: 0,
        email: 0,
        telefone: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo registro' : 'Editar registro'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.alunos = [
          {
            nome: 'Ana Maria',
            matricula: 3752344,
            email: 'mariaana@yahoo.com',
            telefone: 94108060,
          },
          {
            nome: 'Nicolas Serpa',
            matricula: 1044929,
            email: 'serpacnicolas@gmail.com',
            telefone: 995584163,
          },
          {
            nome: 'Anderson Santos',
            matricula: 3922543,
            email: 'andersonsantos@hotmail.com',
            telefone: 98754390,

          },
          {
            nome: 'Mateus Ferreira',
            matricula: 4084523,
            email: 'mateusferreira@gmail.com',
            telefone: 87438923,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.alunos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.alunos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.alunos.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.alunos[this.editedIndex], this.editedItem)
        } else {
          this.alunos.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
