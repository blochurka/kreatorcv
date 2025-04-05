document.addEventListener('DOMContentLoaded', function() {
    // Elementy DOM
    const templateCards = document.querySelectorAll('.template-card');
    const editorContainer = document.getElementById('cv-editor');
    const previewContainer = document.getElementById('cv-preview');
    const backBtn = document.getElementById('back-btn');
    const previewBtn = document.getElementById('preview-btn');
    const editBtn = document.getElementById('edit-btn');
    const downloadBtn = document.getElementById('download-btn');
    const projectsSection = document.getElementById('projects-section');
    
    let currentTemplate = '';
    
    // Wybór szablonu
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            currentTemplate = this.dataset.template;
            
            // Pokaż/ukryj sekcję projektów dla szablonu programisty
            if (currentTemplate === 'developer') {
                projectsSection.style.display = 'block';
            } else {
                projectsSection.style.display = 'none';
            }
            
            document.querySelector('.template-selection').style.display = 'none';
            editorContainer.classList.add('active');
        });
    });
    
    // Przyciski nawigacji
    backBtn.addEventListener('click', function() {
        editorContainer.classList.remove('active');
        document.querySelector('.template-selection').style.display = 'flex';
    });
    
    previewBtn.addEventListener('click', function() {
        generatePreview();
        editorContainer.style.display = 'none';
        previewContainer.style.display = 'block';
    });
    
    editBtn.addEventListener('click', function() {
        previewContainer.style.display = 'none';
        editorContainer.style.display = 'block';
    });
    
    downloadBtn.addEventListener('click', function() {
        const element = document.getElementById('cv-document');
        const options = {
            margin: 10,
            filename: 'moje_cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(options).from(element).save();
    });
    
    // Dynamiczne dodawanie doświadczenia
    document.getElementById('add-experience').addEventListener('click', function() {
        addDynamicField('experience-list', createExperienceField);
    });
    
    // Dynamiczne dodawanie wykształcenia
    document.getElementById('add-education').addEventListener('click', function() {
        addDynamicField('education-list', createEducationField);
    });
    
    // Dynamiczne dodawanie języków
    document.getElementById('add-language').addEventListener('click', function() {
        addDynamicField('languages-list', createLanguageField);
    });
    
    // Dynamiczne dodawanie projektów
    document.getElementById('add-project').addEventListener('click', function() {
        addDynamicField('projects-list', createProjectField);
    });
    
    // Funkcja dodawania dynamicznego pola
    function addDynamicField(listId, createFieldFunc) {
        const list = document.getElementById(listId);
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.innerHTML = createFieldFunc();
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', function() {
            list.removeChild(newItem);
        });
        
        newItem.appendChild(removeBtn);
        list.appendChild(newItem);
    }
    
    // Funkcje tworzące pola formularza
    function createExperienceField() {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label>Stanowisko</label>
                    <input type="text" name="job-title[]">
                </div>
                <div class="form-group">
                    <label>Nazwa firmy</label>
                    <input type="text" name="company[]">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Data rozpoczęcia</label>
                    <input type="month" name="job-start[]">
                </div>
                <div class="form-group">
                    <label>Data zakończenia</label>
                    <input type="month" name="job-end[]" placeholder="Obecnie">
                </div>
            </div>
            <div class="form-group">
                <label>Opis obowiązków</label>
                <textarea name="job-description[]"></textarea>
            </div>
        `;
    }
    
    function createEducationField() {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label>Poziom</label>
                    <select name="edu-level[]">
                        <option value="licencjat">Licencjat</option>
                        <option value="inzynier">Inżynier</option>
                        <option value="magister">Magister</option>
                        <option value="doktor">Doktor</option>
                        <option value="inne">Inne</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Kierunek</label>
                    <input type="text" name="edu-field[]">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Nazwa uczelni</label>
                    <input type="text" name="school[]">
                </div>
                <div class="form-group">
                    <label>Rok ukończenia</label>
                    <input type="number" name="graduation-year[]" min="1950" max="2099">
                </div>
            </div>
        `;
    }
    
    function createLanguageField() {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label>Język</label>
                    <input type="text" name="language[]">
                </div>
                <div class="form-group">
                    <label>Poziom</label>
                    <select name="language-level[]">
                        <option value="A1">A1 - Początkujący</option>
                        <option value="A2">A2 - Podstawowy</option>
                        <option value="B1">B1 - Średnio zaawansowany</option>
                        <option value="B2">B2 - Ponad średnio zaawansowany</option>
                        <option value="C1">C1 - Zaawansowany</option>
                        <option value="C2">C2 - Biegły</option>
                        <option value="native">Język ojczysty</option>
                    </select>
                </div>
            </div>
        `;
    }
    
    function createProjectField() {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label>Nazwa projektu</label>
                    <input type="text" name="project-name[]">
                </div>
                <div class="form-group">
                    <label>Link (opcjonalnie)</label>
                    <input type="url" name="project-link[]">
                </div>
            </div>
            <div class="form-group">
                <label>Opis</label>
                <textarea name="project-description[]"></textarea>
            </div>
            <div class="form-group">
                <label>Technologie</label>
                <input type="text" name="project-tech[]" placeholder="np. React, Node.js, MongoDB">
            </div>
        `;
    }
    
    // Funkcja generująca podgląd CV
    function generatePreview() {
        const cvDocument = document.getElementById('cv-document');
        
        let previewHTML = '';
        
        if (currentTemplate === 'classic') {
            previewHTML = generateClassicTemplate();
        } else if (currentTemplate === 'modern') {
            previewHTML = generateModernTemplate();
        } else if (currentTemplate === 'starter') {
            previewHTML = generateStarterTemplate();
        } else if (currentTemplate === 'developer') {
            previewHTML = generateDeveloperTemplate();
        }
        
        cvDocument.innerHTML = previewHTML;
    }
    
    // Funkcje generujące różne szablony CV
    function generateClassicTemplate() {
        // Pobierz wszystkie doświadczenia
        let experienceHTML = '';
        document.querySelectorAll('#experience-list .list-item').forEach(item => {
            const jobTitle = item.querySelector('[name="job-title[]"]').value;
            const company = item.querySelector('[name="company[]"]').value;
            const startDate = formatDate(item.querySelector('[name="job-start[]"]').value);
            const endDate = item.querySelector('[name="job-end[]"]').value || 'Obecnie';
            const description = item.querySelector('[name="job-description[]"]').value;
            
            experienceHTML += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin-bottom: 5px;">${jobTitle} | ${company}</h4>
                    <p style="margin-top: 0; color: #666;">${startDate} - ${endDate}</p>
                    <p>${description}</p>
                </div>
            `;
        });
        
        // Pobierz wszystkie wykształcenia
        let educationHTML = '';
        document.querySelectorAll('#education-list .list-item').forEach(item => {
            const level = item.querySelector('[name="edu-level[]"]').value;
            const field = item.querySelector('[name="edu-field[]"]').value;
            const school = item.querySelector('[name="school[]"]').value;
            const year = item.querySelector('[name="graduation-year[]"]').value;
            
            educationHTML += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin-bottom: 5px;">${level}, ${field}</h4>
                    <p style="margin-top: 0;">${school} | ${year}</p>
                </div>
            `;
        });
        
        // Pobierz umiejętności
        const skills = document.getElementById('skills').value;
        let skillsHTML = '';
        if (skills) {
            const skillsArray = skills.split(',').map(skill => skill.trim());
            skillsHTML = skillsArray.join(', ');
        }
        
        // Pobierz języki
        let languagesHTML = '';
        document.querySelectorAll('#languages-list .list-item').forEach(item => {
            const language = item.querySelector('[name="language[]"]').value;
            const level = item.querySelector('[name="language-level[]"]').value;
            
            languagesHTML += `<p>${language} - ${level}</p>`;
        });
        
        return `
            <div style="font-family: 'Times New Roman', serif; padding: 30px; color: #333;">
                <div style="border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
                    <h1 style="margin: 0;">${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</h1>
                    <h3 style="margin: 5px 0 0; font-weight: normal;">${document.getElementById('position').value}</h3>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p>${document.getElementById('summary').value}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="border-bottom: 1px solid #333; padding-bottom: 5px;">Dane kontaktowe</h2>
                    <p>Email: ${document.getElementById('email').value}</p>
                    <p>Telefon: ${document.getElementById('phone').value}</p>
                    <p>Lokalizacja: ${document.getElementById('location').value}</p>
                    ${document.getElementById('linkedin').value ? `<p>LinkedIn: ${document.getElementById('linkedin').value}</p>` : ''}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="border-bottom: 1px solid #333; padding-bottom: 5px;">Doświadczenie zawodowe</h2>
                    ${experienceHTML || '<p>Brak doświadczenia zawodowego</p>'}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="border-bottom: 1px solid #333; padding-bottom: 5px;">Wykształcenie</h2>
                    ${educationHTML || '<p>Brak informacji o wykształceniu</p>'}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="border-bottom: 1px solid #333; padding-bottom: 5px;">Umiejętności</h2>
                    <p>${skillsHTML || 'Brak umiejętności'}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="border-bottom: 1px solid #333; padding-bottom: 5px;">Języki obce</h2>
                    ${languagesHTML || '<p>Brak języków obcych</p>'}
                </div>
                
                ${document.getElementById('additional').value ? `
                <div style="margin-bottom: 20px;">
                    <h2 style="border-bottom: 1px solid #333; padding-bottom: 5px;">Dodatkowe informacje</h2>
                    <p>${document.getElementById('additional').value}</p>
                </div>` : ''}
                
                <div style="font-size: 0.8em; color: #666; margin-top: 30px;">
                    <p>${document.getElementById('gdpr').value}</p>
                </div>
            </div>
        `;
    }
    
    function generateModernTemplate() {
        // Pobierz wszystkie doświadczenia
        let experienceHTML = '';
        document.querySelectorAll('#experience-list .list-item').forEach(item => {
            const jobTitle = item.querySelector('[name="job-title[]"]').value;
            const company = item.querySelector('[name="company[]"]').value;
            const startDate = formatDate(item.querySelector('[name="job-start[]"]').value);
            const endDate = item.querySelector('[name="job-end[]"]').value || 'Obecnie';
            const description = item.querySelector('[name="job-description[]"]').value;
            
            experienceHTML += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin-bottom: 5px; color: #4a6fa5;">${jobTitle}</h
