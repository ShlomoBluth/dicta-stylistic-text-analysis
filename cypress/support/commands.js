Cypress.Commands.add('selectTanachText',({collection,book='',popupInner=''})=>{
    cy.get('p').contains('Click Select to choose text(s).')
    .first().parent().siblings('button').click({force: true})
    //If selected the all collection
    if(book==''){
        cy.get('div[class="scrollable25"]').within(()=>{
            cy.contains(collection).click({force: true})
        })
    }else{
        cy.get('div[class*="scrollable25"]').within(()=>{
            cy.contains(collection).siblings('div[class="after"]').click({force: true})
        })
        if(popupInner=='true'){
            cy.get('.popup-inner > .text-selection-popup').within(()=>{
                cy.get('label[id="showtxt"]').contains(book).should('exist')
                cy.contains(book).click({force: true})
                cy.get('button').contains('Select Text').click({force: true})
            })
        }else{
            cy.get('div[class*="scrollable25"]').within(()=>{
                cy.get('label[id="showtxt"]').contains(book).should('exist')
                cy.contains(book).click({force: true})
            })
            cy.get('button').contains('Select Text').click({force: true})

        }
    }
})

Cypress.Commands.add('selectUploudfile',({file,popupInner=''})=>{
    cy.get('div[class="text-selection-popup"]').should('have.css','display','none')
    cy.get('p').contains('Click Select to choose text(s).')
    .first().parent().siblings('button').click({force: true})
    if(popupInner==true){
        cy.get('.popup-inner > .text-selection-popup').should('be.visible').within(()=>{
            cy.get('a').contains('Upload').click({force:true})
            cy.get('li[role="presentation"]').first().next().should('have.attr','class','active')
            cy.get('input[type="file"]').attachFile(file).trigger('input',{force: true})
        })
    }else{
        cy.get('div[class="text-selection-popup"]').should('not.have.css','display','none')
        cy.get('a').contains('Upload').click({force:true})
        cy.get('[class*="tab-pane"]').first().next().should('have.attr','class','tab-pane active')
        //cy.get('button').contains('Upload').click({force: true})
        cy.get('input[type="file"]').attachFile(file).trigger('input',{force: true})
        //cy.get('div[class="text-selection-popup"]').should('have.css','display','none')
    //cy.url().should('eq','https://generalclassify.dicta.org.il/#/')
    }
})


Cypress.Commands.add('selectTextRequest',({type,url,status=200,message='',delaySeconds=0})=>{
    cy.intercept('POST','**'+url, {
        delayMs:1000*delaySeconds,
        statusCode: status
    })
    cy.get('button').contains('Start Experiment').click({force: true})
    cy.then(()=>{
        if(type=='tanach'){
            cy.selectTanachText({
                collection:'Torah',
                book:'Genesis',
                delaySeconds:delaySeconds,
                message:message
            })
        }else if(type=='file'){
            cy.selectUploudfile({file:'Genesis.txt'})
        }
    }).then(()=>{
        cy.tastMessage({
            HtmlElement:'span > .v-spinner > .v-clip',
            delaySeconds:delaySeconds,
            message:message,
            spinnerShould:'not.exist'
        })
    })
})

Cypress.Commands.add('waitForUploading',()=>{
    cy.contains('Uploading...').should('exist')
    cy.contains('Uploading...').should('not.exist')
})


Cypress.Commands.add('tastMessage',({HtmlElement,delaySeconds=0,message='',spinnerShould})=>{
    if(delaySeconds>0){
        cy.get(HtmlElement,{timeout:1000*delaySeconds}).should(spinnerShould)
    }else{
        cy.get(HtmlElement,{timeout:1000*60}).should(spinnerShould)
    }
    if(message.length>0){
        cy.contains(message).should('be.visible')
    }
})






Cypress.Commands.add('classificationOfTextRequest',({url,status=200,message='',delaySeconds=0})=>{
    cy.intercept('POST','**'+url, {
        delayMs:1000*delaySeconds,
        statusCode: status
    })
    cy.get('button').contains('Start Experiment').click({force: true})
    cy.selectTanachText({
        collection:'Torah',
        book:'Genesis'
    })

    cy.selectTanachText({
        collection:'Torah',
        book:'Exodus'
    })
    .then(()=>{
        cy.get('button').contains('Analyze Classes').click({force: true})
    })
    if(url!='classify'){
        cy.tastMessage({
            HtmlElement:':nth-child(1) > .v-spinner > .v-clip',
            delaySeconds:delaySeconds,
            message:message,
            spinnerShould:'not.exist'
        })
    }else{
        cy.get(':nth-child(1) > .v-spinner > .v-clip',{timeout:1000*60}).should('not.exist')
        cy.get('button[data-target="#text_for_classification_popup"]').click({force: true})
        cy.selectTanachText({
            collection:'Torah',
            book:'Numbers',
            popupInner:'true'
        })
        cy.get('button').contains('Classify Text').click({force: true})
        cy.tastMessage({
            HtmlElement:'[class*="spinner"]',
            delaySeconds:delaySeconds,
            message:message,
            spinnerShould:'not.be.visible'
        })
    }

})