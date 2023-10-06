/// <reference types="cypress"/>

//run tests on requests from bible classification run

const urls = new Map();
urls.set('live',Cypress.env('LIVE_URL'))
//urls.set('dev',Cypress.env('DEV_URL')) 

const sizes= new Map();
sizes.set('desktop',[1000, 660])
//sizes.set('mobile','iphone-x')


urls.forEach((urlValue,urlKey)=>{

  sizes.forEach((sizeValue,sizeKey) => {


    describe('requestsTests '+urlKey+' '+sizeKey,()=>{

    
      beforeEach(() => {
        cy.screenSize({size:sizeValue})
        cy.visitpage({url:urlValue})
      })

      // it('Error message for GetTextLargeAndSmall response with a delay of 5 minutes when clicking the run button'+
      // ' of tiberias page',()=>{
      //   cy.selectTextRequest({
      //     type:'tanach',
      //     url:'GetTextLargeAndSmall',
      //     message:' Server took too long to respond.',
      //     delaySeconds:65*5
      //   })
      // })
    
      
      // it('Error message for GetTextLargeAndSmall response with status code 500 when clicking the run button of tiberias page'
      // ,()=>{
      //   cy.selectTextRequest({
      //     type:'tanach',
      //     url:'GetTextLargeAndSmall',
      //     status:500,
      //     message:' Server failed to respond.'
      //   })
      // })
    
      
        
    
      it('Error message for statistics response with a delay of 2 minutes when clicking the run button'+
      ' of tiberias page',()=>{
        cy.classificationOfTextRequest({
          url:'statistics',
          message:'Feature Extraction: Server took too long to respond.',
          delaySeconds:65*2
        })
      })
    
      
      it('Error message for statistics response with status code 500 when clicking the run button of tiberias page'
      ,()=>{
        cy.classificationOfTextRequest({
          url:'statistics',
          status:500,
          message:'Feature Extraction: Server failed to respond.'
        })
      })
    
      it('Error message for crossvalidate response with a delay of 1 minutes when clicking the run button'+
      ' of tiberias page',()=>{
        cy.classificationOfTextRequest({
          url:'crossvalidate',
          message:'Cross-validation: Server took too long to respond.',
          delaySeconds:65*2
        })
      })
    
      
      it('Error message for crossvalidate response with status code 500 when clicking the run button of tiberias page'
      ,()=>{
        cy.classificationOfTextRequest({
          url:'crossvalidate',
          status:500,
          message:'Cross-validation: Server failed to respond.'
        })
      })
    
      
    
      it('Error message for classify response with a delay of 5 minutes when clicking the run button'+
      ' of tiberias page',()=>{
        cy.classificationOfTextRequest({
          url:'classify',
          message:'Server took too long to respond.',
          delaySeconds:65*5
        })
      })
    
      
      it('Error message for classify response with status code 500 when clicking the run button of tiberias page'
      ,()=>{
        cy.classificationOfTextRequest({
          url:'classify',
          status:500,
          message:'Server failed to respond.'
        })
      })
  
      // it('Error message for UploadFile response with a delay of 5 minutes when clicking the run button'+
      // ' of tiberias page',()=>{
      //   cy.selectTextRequest({
      //     type:'file',
      //     url:'UploadFile',
      //     message:'Server took too long to respond.',
      //     delaySeconds:65*5
      //   })
      // })
    
      
      // it('Error message for UploadFile response with status code 500 when clicking the run button of tiberias page'
      // ,()=>{
      //   cy.selectTextRequest({
      //     type:'file',
      //     url:'UploadFile',
      //     status:500,
      //     message:'Server failed to respond.'
      //   })
      // })
  
      // it('Error message for Login response with a delay of 5 minutes when clicking the run button'+
      // ' of tiberias page',()=>{
      //   cy.selectTextRequest({
      //     type:'file',
      //     url:'Login',
      //     message:'Server took too long to respond.',
      //     delaySeconds:65*5
      //   })
      // })
    
      
      // it('Error message for Login response with status code 500 when clicking the run button of tiberias page'
      // ,()=>{
      //   cy.selectTextRequest({
      //     type:'file',
      //     url:'Login',
      //     status:500,
      //     message:'Server failed to respond.'
      //   })
      // })
  
  
    
  
  
    })     
  })
})
