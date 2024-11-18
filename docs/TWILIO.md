### Fluxo Whatsapp

##### Chamadas a API e regras de negócio são criadas em cima do contexto do meu projeto, ou seja, não é nem definitivo e nem imutável.
---

- [x] Criar uma subconta utilizando a SDK

| Metodo 	| Rota                              	| Body                    	| Headers                              	|
|--------	|-----------------------------------	|-------------------------	|--------------------------------------	|
| POST   	| whatsapp/internal/accounts/create 	| { accountName: string } 	| twilio-account-sid twilio-auth-token 	|
| GET    	| whatsapp/internal/accounts        	|                         	| twilio-account-sid twilio-auth-token 	|
- [ ] Registrar um Número para WhatsApp associado à subconta.
Aqui deve utilizar da [API de senders](https://www.twilio.com/docs/whatsapp/api/senders) da twilio, pois na SDK não tem suporte.
**Não implementei ainda.**   
   
- [x] Criar template, aprovar e verificar status.
Essa parte fica dividida em duas situações. 
[Criação](#criação) -> Utiliza a SDK da twilio. (Com algumas alterações que devem ser feitas)
[Enviar para approval e verificar status](#approval-e-status) -> Utiliza a API.

#### Criação
| Metodo 	| Rota                              	| Body                    	| Headers                              	|
|--------	|-----------------------------------	|-------------------------	|--------------------------------------	|
| POST   	| whatsapp/internal/template 	| {  friendlyName: string  template: {     type: Type {        content: any{}     }  variables: {     [key]: value  } } 	| twilio-account-sid twilio-auth-token |

Alterações que devem ser realizadas: [Fix](https://github.com/twilio/twilio-node/pull/1046)

#### Approval e Status
Esses métodos não existem na SDK portanto deve ser feito um fetch para a API da twilio.

| Metodo 	| Rota                                              	| Body                                	| Headers                              	|
|--------	|---------------------------------------------------	|-------------------------------------	|--------------------------------------	|
| POST   	| whatsapp/external/templates/submit/{TEMPLATE_SID} 	| {  name: string  category: string } 	| twilio-account-sid twilio-auth-token 	|
| GET    	| whatsapp/external/templates/status/{TEMPLATE_SID} 	|                                     	| twilio-account-sid twilio-auth-token 	|

