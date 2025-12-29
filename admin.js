// 생물 데이터 저장소 (localStorage와 연동)
let creaturesData = {};
let biomesData = {};

// localStorage에서 데이터 로드
function loadCreaturesFromStorage() {
    console.log('데이터 로드 시작...');
    const savedData = localStorage.getItem('subnautica_creatures');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            const defaultData = getDefaultCreatures();
            
            // 기존 데이터가 있으면 병합 (사용자 수정 사항 보존)
            creaturesData = {};
            
            // 기본 데이터의 모든 생물을 확인
            Object.keys(defaultData).forEach(id => {
                if (parsedData[id]) {
                    // 기존에 저장된 데이터가 있으면 사용 (사용자 수정 사항 보존)
                    creaturesData[id] = parsedData[id];
                    
                    // 이미지 정보가 없는 경우에만 기본값 추가
                    if (!creaturesData[id].hasOwnProperty('image')) {
                        creaturesData[id].image = defaultData[id].image;
                        creaturesData[id].isVideo = defaultData[id].isVideo;
                        console.log(`생물 ${creaturesData[id].name}에 이미지 정보 추가`);
                    }
                } else {
                    // 새로운 생물이면 기본값 사용
                    creaturesData[id] = defaultData[id];
                    console.log(`새 생물 ${defaultData[id].name} 추가`);
                }
            });
            
            // 사용자가 추가한 커스텀 생물들도 보존
            Object.keys(parsedData).forEach(id => {
                if (!defaultData[id]) {
                    creaturesData[id] = parsedData[id];
                    console.log(`커스텀 생물 ${parsedData[id].name} 보존`);
                }
            });
            
            saveCreaturesToStorage();
            console.log('데이터 병합 완료:', Object.keys(creaturesData).length, '개 생물');
        } catch (e) {
            console.error('데이터 파싱 오류:', e);
            creaturesData = getDefaultCreatures();
            saveCreaturesToStorage();
        }
    } else {
        console.log('저장된 데이터가 없음. 기본 데이터 사용.');
        creaturesData = getDefaultCreatures();
        saveCreaturesToStorage();
    }
}

// 생물군계 데이터 로드
function loadBiomesFromStorage() {
    console.log('생물군계 데이터 로드 시작...');
    const savedData = localStorage.getItem('subnautica_biomes');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            const defaultData = getDefaultBiomes();
            
            // 기존 데이터가 있으면 병합 (사용자 수정 사항 보존)
            biomesData = {};
            
            // 기본 데이터의 모든 생물군계를 확인
            Object.keys(defaultData).forEach(id => {
                if (parsedData[id]) {
                    // 기존에 저장된 데이터가 있으면 사용 (사용자 수정 사항 보존)
                    biomesData[id] = parsedData[id];
                    
                    // 이미지 정보가 없는 경우에만 기본값 추가
                    if (!biomesData[id].hasOwnProperty('image')) {
                        biomesData[id].image = defaultData[id].image;
                        console.log(`생물군계 ${biomesData[id].name}에 이미지 정보 추가`);
                    }
                } else {
                    // 새로운 생물군계면 기본값 사용
                    biomesData[id] = defaultData[id];
                    console.log(`새 생물군계 ${defaultData[id].name} 추가`);
                }
            });
            
            // 사용자가 추가한 커스텀 생물군계들도 보존
            Object.keys(parsedData).forEach(id => {
                if (!defaultData[id]) {
                    biomesData[id] = parsedData[id];
                    console.log(`커스텀 생물군계 ${parsedData[id].name} 보존`);
                }
            });
            
            saveBiomesToStorage();
            console.log('생물군계 데이터 병합 완료:', Object.keys(biomesData).length, '개 생물군계');
        } catch (e) {
            console.error('생물군계 데이터 파싱 오류:', e);
            biomesData = getDefaultBiomes();
            saveBiomesToStorage();
        }
    } else {
        console.log('저장된 생물군계 데이터가 없음. 기본 데이터 사용.');
        biomesData = getDefaultBiomes();
        saveBiomesToStorage();
    }
}

// 기본 생물 데이터 반환
function getDefaultCreatures() {
    return {
        1: {
            name: '사신 레비아탄',
            emoji: '🦈',
            danger: '극위험',
            description: '55m의 거대한 몸길이를 가진 흉악하고 호전적인 포식자. 특유의 울림 있는 괴성으로 플레이어를 위협하며, 오로라호 주변과 마운틴섬에서 서식한다. 총 25마리가 맵 전체에 분포.',
            type: '포식자',
            image: 'images/리퍼 레비아탄.mp4',
            isVideo: true
        },
        2: {
            name: '해룡 레비아탄',
            emoji: '🐲',
            danger: '극위험',
            description: 'Dangerous Creatures 업데이트로 추가된 최강 생물. 용암지대에서 서식하며 사신 레비아탄을 주 먹이로 삼는다. 총 3마리만 존재하는 희귀한 최상위 포식자.',
            type: '포식자',
            image: 'images/해룡 레비아탄.webp'
        },
        3: {
            name: '유령 레비아탄',
            emoji: '👻',
            danger: '극위험',
            description: '반투명한 몸체를 가진 거대한 레비아탄. 대암초에 성체 2마리, 북부 핏빛 해초 숲에 성체 1마리, 잃어버린 강에 아성체 3마리가 서식한다.',
            type: '포식자',
            image: 'images/유령 레비아탄.webp'
        },
        4: {
            name: '페퍼',
            emoji: '🐟',
            danger: '안전',
            description: '작고 귀여운 물고기로 안전한 얕은 곳에서 서식합니다. 사신 레비아탄의 먹이로도 사용할 수 있어 위험 상황에서 유용한 생물 유인책 역할을 한다.',
            type: '초식동물',
            image: 'images/피퍼.webp'
        },
        5: {
            name: '스토커',
            emoji: '🐙',
            danger: '주의',
            description: '켈프 숲에서 서식하며 금속을 수집하는 습성이 있습니다. 플레이어에게 적대적이지만 금속 조각으로 주의를 돌릴 수 있으며, 스토커 이빨은 중요한 제작 재료다.',
            type: '중성',
            image: 'images/게오징어.webp'
        },
        6: {
            name: '모래상어',
            emoji: '🦈',
            danger: '위험',
            description: '모래 지역에서 서식하는 중형 포식자. 오로라호 승무원들을 잡아먹은 것으로 추정되는 위험한 생물로, 모래 속에 숨어있다가 기습 공격한다.',
            type: '포식자',
            image: 'images/모래상어.webp'
        },
        7: {
            name: '동굴벌레',
            emoji: '�',
            danger: '주의',
            description: '동굴에서 서식하는 생물로 오로라호 승무원의 시체를 먹은 것으로 확인된 청소부 역할을 하는 생물. 동굴 탐험 시 주의가 필요하다.',
            type: '중성',
            image: 'images/동굴벌레.webp'
        },
        8: {
            name: '뼈상어',
            emoji: '🦴',
            danger: '위험',
            description: '뼈로 이루어진 외골격을 가진 상어. 공격적이며 빠른 속도로 플레이어를 추격한다. 뼈상어 표본은 중요한 연구 자료가 된다.',
            type: '포식자',
            image: 'images/뼈상어.webp'
        },
        9: {
            name: '추적자',
            emoji: '🔍',
            danger: '주의',
            description: '플레이어를 끈질기게 추적하는 생물. 비교적 작지만 지속적으로 따라다니며 위협을 가한다. 페퍼를 먹이로 주면 일시적으로 공격을 멈춘다.',
            type: '포식자',
            image: 'images/추적자.webp'
        },
        10: {
            name: '공간도약자',
            emoji: '⚡',
            danger: '극위험',
            description: '순간이동 능력을 가진 특수한 생물. 정지소총으로도 제압하기 어려운 유일한 생물로, 예측 불가능한 움직임으로 플레이어를 위협한다.',
            type: '포식자',
            image: 'images/공간도약자.webp'
        },
        11: {
            name: '산호등 레비아탄',
            emoji: '🪸',
            danger: '안전',
            description: '거대하지만 온순한 레비아탄. 등에 산호가 자라고 있으며 플레이어에게 해를 끼치지 않는다. 대부분의 플레이어가 처음 만나는 레비아탄급 생물.',
            type: '초식동물',
            image: 'images/산호등 레비아탄.webp'
        },
        12: {
            name: '바다황제 레비아탄',
            emoji: '👑',
            danger: '안전',
            description: '서브노티카의 핵심 스토리와 관련된 지적 생명체. 텔레파시 능력을 가지고 있으며 플레이어와 소통할 수 있는 유일한 레비아탄.',
            type: '중성',
            image: 'images/바다황제 레비아탄.webp'
        },
        13: {
            name: '가시가오리',
            emoji: '🐟',
            danger: '주의',
            description: '독성 가시를 가진 가오리. 접촉 시 독 데미지를 입히므로 주의가 필요하다. 얕은 바다에서 주로 발견된다.',
            type: '중성',
            image: 'images/게오징어.webp'
        },
        14: {
            name: '크래시피쉬',
            emoji: '💥',
            danger: '위험',
            description: '폭발하는 물고기. 플레이어나 다른 생물에게 접근하면 자폭하여 큰 피해를 준다. 크래시피쉬 파우더는 폭발물 제작에 사용된다.',
            type: '중성',
            image: 'images/폭파고기.webp'
        },
        15: {
            name: '메스머',
            emoji: '👁️',
            danger: '주의',
            description: '최면 능력을 가진 생물. 플레이어의 시야를 흐리게 하고 조종하려 한다. 아름다운 외모와 달리 위험한 능력을 가지고 있다.',
            type: '중성',
            image: 'images/메스머.webp'
        }
    };
}

// 기본 생물군계 데이터 반환
function getDefaultBiomes() {
    return {
        1: {
            name: '안전한 여울',
            emoji: '🏝️',
            depth: '0-50m',
            description: '게임 시작 지역으로 가장 안전한 얕은 바다. 기본적인 자원과 온순한 생물들이 서식하며, 구명포드가 착륙한 곳이다. 티타늄, 구리, 석영 등 초기 필수 자원을 쉽게 구할 수 있다.',
            type: '안전',
            creatures: ['피퍼', '부레고기', '가소포드', '토끼가오리'],
            image: 'images/안전한여울.webp'
        },
        2: {
            name: '해초 숲',
            emoji: '🌿',
            depth: '0-160m',
            description: '거대한 미역덩굴이 자라는 숲 같은 지역. 추적자가 서식하지만 금속 조각으로 주의를 돌릴 수 있다. 미역덩굴과 추적자 이빨은 중요한 제작 재료다.',
            type: '주의',
            creatures: ['추적자', '메스머', '피퍼', '부유고기'],
            image: 'images/해초숲.webp'
        },
        3: {
            name: '초원 평야',
            emoji: '🌾',
            depth: '50-170m',
            description: '붉은 조류가 자생하는 평원 지대. 사암에서 은과 금을 채굴할 수 있으며, 산고등 레비아탄이 서식한다. 모래상어와 호랑이풀을 조심해야 한다.',
            type: '주의',
            creatures: ['산고등 레비아탄', '모래상어', '레지널드'],
            image: 'images/초원평야.webp'
        },
        4: {
            name: '버섯 숲',
            emoji: '🍄',
            depth: '125-250m',
            description: '거대한 나무버섯이 우거진 신비로운 지역. 리튬을 안정적으로 채굴할 수 있으며, 젤리가오리와 뼈상어가 서식한다. 사이클롭스 파편을 찾을 수 있다.',
            type: '위험',
            creatures: ['젤리가오리', '뼈상어', '전류장어'],
            image: 'images/버섯숲.webp'
        },
        5: {
            name: '대암초',
            emoji: '🪨',
            depth: '150-300m',
            description: '거대한 산고 구조물이 있는 깊은 지역. 유령 레비아탄이 서식하는 위험한 곳이지만 희귀한 자원들을 얻을 수 있다.',
            type: '극위험',
            creatures: ['유령 레비아탄', '크랩스퀴드', '워퍼'],
            image: 'images/대암초.webp'
        },
        6: {
            name: '심해 대협곡',
            emoji: '🕳️',
            depth: '300-1500m',
            description: '행성에서 가장 깊은 지역 중 하나. 극한의 압력과 어둠 속에서 희귀한 자원과 위험한 생물들이 서식한다.',
            type: '극위험',
            creatures: ['고스트 레비아탄', '크랙스퀴드', '라바 라바'],
            image: 'images/심해대협곡.mp4',
            isVideo: true
        },
        7: {
            name: '용암 지대',
            emoji: '🌋',
            depth: '1200-1700m',
            description: '행성의 가장 깊은 곳으로 용암이 흐르는 극한 지역. 해룡 레비아탄이 서식하며 이온 큐브와 크리스탈린 황을 얻을 수 있다.',
            type: '극위험',
            creatures: ['해룡 레비아탄', '라바 리저드', '라바 유충'],
            image: 'images/용암지대.mp4',
            isVideo: true
        },
        8: {
            name: '잃어버린 강',
            emoji: '🌊',
            depth: '500-900m',
            description: '지하 강처럼 생긴 독특한 지형. 유령 레비아탄의 아성체들이 서식하며, 고대 해골과 화석을 발견할 수 있다.',
            type: '극위험',
            creatures: ['유령 레비아탄 (아성체)', '리버 프라운더', '스파인피쉬'],
            image: 'images/잃어버린강.webp'
        },
        9: {
            name: '핏빛 해초 숲',
            emoji: '🩸',
            depth: '200-500m',
            description: '붉은 해초가 자라는 어두운 지역. 크랩스퀴드와 워퍼가 서식하며, 우라니나이트를 채굴할 수 있다.',
            type: '위험',
            creatures: ['크랩스퀴드', '워퍼', '크랩 스네이크'],
            image: 'images/핏빛해초숲.webp'
        },
        10: {
            name: '수중 제도',
            emoji: '🏔️',
            depth: '100-400m',
            description: '물 위로 솟아오른 섬들과 수중 동굴 시스템. 다양한 자원과 생물들이 서식하며 탐험 가치가 높다.',
            type: '주의',
            creatures: ['스카이레이', '록 그럽', '플로터'],
            image: 'images/수중제도.webp'
        }
    };
}

// localStorage에 생물군계 데이터 저장
function saveBiomesToStorage() {
    localStorage.setItem('subnautica_biomes', JSON.stringify(biomesData));
    console.log('생물군계 데이터 저장됨:', Object.keys(biomesData).length, '개 생물군계');
}
function saveCreaturesToStorage() {
    localStorage.setItem('subnautica_creatures', JSON.stringify(creaturesData));
    console.log('데이터 저장됨:', Object.keys(creaturesData).length, '개 생물');
}

// localStorage 초기화 (디버깅용)
function resetCreatureData() {
    if (confirm('모든 생물 데이터를 초기화하시겠습니까?')) {
        localStorage.removeItem('subnautica_creatures');
        loadCreaturesFromStorage();
        renderAdminCreatures();
        showNotification('데이터가 초기화되었습니다.', 'info');
    }
}

// 새 생물 추가 모달 열기
function openAddCreatureModal() {
    document.getElementById('addCreatureModal').style.display = 'block';
}

// 새 생물 추가 모달 닫기
function closeAddModal() {
    document.getElementById('addCreatureModal').style.display = 'none';
    document.getElementById('addCreatureForm').reset();
    // 이모지 선택 초기화
    document.querySelectorAll('#addCreatureModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
    });
}

// 새 생물 추가용 이모지 선택
function selectEmojiForAdd(emoji) {
    document.getElementById('newCreatureEmoji').value = emoji;
    // 선택 상태 업데이트
    document.querySelectorAll('#addCreatureModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === emoji) {
            option.classList.add('selected');
        }
    });
}

// 관리자 페이지 생물 카드들을 동적으로 생성
function renderAdminCreatures(filter = 'all') {
    console.log('renderAdminCreatures 함수 호출됨. 필터:', filter);
    
    const grid = document.getElementById('admin-creatures-grid');
    if (!grid) {
        console.error('admin-creatures-grid 요소를 찾을 수 없습니다.');
        // 대체 방법으로 클래스명으로 찾기
        const altGrid = document.querySelector('.creature-grid');
        if (altGrid) {
            console.log('대체 그리드 요소 찾음');
            renderCreaturesToGrid(altGrid, filter);
        }
        return;
    }
    
    renderCreaturesToGrid(grid, filter);
}

// 실제 생물 카드 렌더링 함수
function renderCreaturesToGrid(grid, filter = 'all') {
    console.log('생물 카드 렌더링 시작:', Object.keys(creaturesData).length, '개 생물, 필터:', filter);
    
    grid.innerHTML = '';
    
    if (Object.keys(creaturesData).length === 0) {
        grid.innerHTML = '<div style="color: #ccffff; text-align: center; grid-column: 1/-1; padding: 2rem;">등록된 생물이 없습니다.</div>';
        return;
    }
    
    let displayedCount = 0;
    Object.entries(creaturesData).forEach(([id, creature]) => {
        // 필터 적용
        if (filter === 'all' || creature.type === filter) {
            console.log('생물 카드 생성:', creature.name);
            
            const card = document.createElement('div');
            card.className = 'creature-card';
            card.setAttribute('data-creature-id', id);
            
            card.innerHTML = `
                <div class="creature-image">${creature.emoji}</div>
                <h4>${creature.name}</h4>
                <p>위험도: ${creature.danger}</p>
                <p class="creature-description">${creature.description}</p>
                <div class="creature-actions-small">
                    <button class="btn-edit" onclick="editCreature(${id})">수정</button>
                    <button class="btn-delete" onclick="deleteCreature(${id})">삭제</button>
                </div>
            `;
            
            grid.appendChild(card);
            displayedCount++;
        }
    });
    
    if (displayedCount === 0) {
        grid.innerHTML = '<div style="color: #ccffff; text-align: center; grid-column: 1/-1; padding: 2rem;">해당 유형의 생물이 없습니다.</div>';
    }
    
    console.log('생물 카드 렌더링 완료. 총', displayedCount, '개 카드 생성됨');
}

// 관리자 필터 버튼 설정
function setupAdminFilterButtons() {
    const filterButtons = document.querySelectorAll('.admin-filter-btn');
    console.log('관리자 필터 버튼 설정:', filterButtons.length, '개');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('관리자 필터 버튼 클릭:', this.textContent, this.dataset.filter);
            
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 필터 적용
            const filter = this.dataset.filter;
            renderAdminCreatures(filter);
        });
    });
}

// 생물 삭제 기능
function deleteCreature(creatureId) {
    if (confirm('정말로 이 생물을 삭제하시겠습니까?')) {
        delete creaturesData[creatureId];
        saveCreaturesToStorage();
        renderAdminCreatures();
        showNotification('생물이 삭제되었습니다.', 'success');
    }
}

// 디버깅을 위한 함수
function debugCreatures() {
    console.log('=== 디버그 정보 ===');
    console.log('현재 생물 데이터:', creaturesData);
    console.log('생물 개수:', Object.keys(creaturesData).length);
    console.log('localStorage 데이터:', localStorage.getItem('subnautica_creatures'));
    
    const grid = document.getElementById('admin-creatures-grid');
    console.log('그리드 요소:', grid);
    
    if (grid) {
        console.log('그리드 자식 요소 개수:', grid.children.length);
        console.log('그리드 innerHTML:', grid.innerHTML);
    }
    
    // 강제로 생물 렌더링 시도
    forceRenderCreatures();
}

// 강제 렌더링 함수
function forceRenderCreatures() {
    console.log('강제 렌더링 시작');
    
    // 데이터가 없으면 기본 데이터 로드
    if (Object.keys(creaturesData).length === 0) {
        console.log('데이터가 없어서 기본 데이터 로드');
        creaturesData = getDefaultCreatures();
        saveCreaturesToStorage();
    }
    
    // 그리드 요소 찾기
    let grid = document.getElementById('admin-creatures-grid');
    
    if (!grid) {
        console.log('ID로 그리드를 찾을 수 없음. 클래스로 찾기 시도');
        grid = document.querySelector('.creature-grid');
    }
    
    if (!grid) {
        console.log('그리드 요소를 찾을 수 없음. 새로 생성');
        const creaturesSection = document.getElementById('creatures');
        if (creaturesSection) {
            grid = document.createElement('div');
            grid.id = 'admin-creatures-grid';
            grid.className = 'creature-grid';
            creaturesSection.appendChild(grid);
        }
    }
    
    if (grid) {
        renderCreaturesToGrid(grid);
    } else {
        console.error('그리드 요소를 생성할 수 없음');
    }
}

// 이미지 데이터 강제 업데이트 함수
function forceUpdateImages() {
    if (confirm('모든 생물에 이미지 데이터를 추가하시겠습니까?\n사용자가 수정한 내용은 보존됩니다.')) {
        console.log('이미지 데이터 업데이트 시작 (사용자 수정 사항 보존)');
        
        const defaultData = getDefaultCreatures();
        
        // 기존 데이터와 병합 (사용자 수정 사항 보존)
        Object.keys(defaultData).forEach(id => {
            if (creaturesData[id]) {
                // 이미지 정보가 없는 경우에만 추가
                if (!creaturesData[id].hasOwnProperty('image')) {
                    creaturesData[id].image = defaultData[id].image;
                    creaturesData[id].isVideo = defaultData[id].isVideo;
                    console.log(`생물 ${creaturesData[id].name}에 이미지 정보 추가`);
                }
            } else {
                // 새로운 생물이면 기본값 사용
                creaturesData[id] = defaultData[id];
                console.log(`새 생물 ${defaultData[id].name} 추가`);
            }
        });
        
        saveCreaturesToStorage();
        renderAdminCreatures();
        showNotification('이미지 데이터가 업데이트되었습니다!\n사용자 수정 사항은 보존되었습니다.', 'success');
        
        // 메인 사이트도 업데이트
        if (window.forceUpdateCreatureImages) {
            window.forceUpdateCreatureImages();
        }
    }
}

// 생물 수정 함수
function editCreature(creatureId) {
    const creature = creaturesData[creatureId];
    if (!creature) return;
    
    // 모달 폼에 데이터 채우기
    document.getElementById('creatureName').value = creature.name;
    document.getElementById('creatureEmoji').value = creature.emoji;
    document.getElementById('creatureDanger').value = creature.danger;
    document.getElementById('creatureDescription').value = creature.description;
    document.getElementById('creatureType').value = creature.type;
    document.getElementById('creatureImage').value = creature.image || '';
    document.getElementById('creatureIsVideo').value = creature.isVideo ? 'true' : 'false';
    
    // 현재 편집 중인 생물 ID 저장
    document.getElementById('editCreatureForm').dataset.creatureId = creatureId;
    
    // 모달 표시
    document.getElementById('editCreatureModal').style.display = 'block';
    
    // 선택된 이모지 하이라이트
    updateEmojiSelection(creature.emoji);
}

// 모달 닫기 함수
function closeEditModal() {
    document.getElementById('editCreatureModal').style.display = 'none';
    // 폼 초기화
    document.getElementById('editCreatureForm').reset();
    // 이모지 선택 초기화
    document.querySelectorAll('#editCreatureModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
    });
}

// 새 생물 추가 모달 닫기
function closeAddModal() {
    document.getElementById('addCreatureModal').style.display = 'none';
    document.getElementById('addCreatureForm').reset();
    // 이모지 선택 초기화
    document.querySelectorAll('#addCreatureModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
    });
}

// 이모지 선택 함수
function selectEmoji(emoji) {
    document.getElementById('creatureEmoji').value = emoji;
    updateEmojiSelection(emoji);
}

// 이모지 선택 상태 업데이트
function updateEmojiSelection(selectedEmoji) {
    document.querySelectorAll('#editCreatureModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === selectedEmoji) {
            option.classList.add('selected');
        }
    });
}

// 생물 카드 업데이트 함수
function updateCreatureCard(creatureId, data) {
    const card = document.querySelector(`[data-creature-id="${creatureId}"]`);
    if (!card) return;
    
    card.querySelector('.creature-image').textContent = data.emoji;
    card.querySelector('h4').textContent = data.name;
    card.querySelector('p').textContent = `위험도: ${data.danger}`;
    card.querySelector('.creature-description').textContent = data.description;
}

// 네비게이션 기능
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모든 네비게이션 링크에서 active 클래스 제거
            navLinks.forEach(nav => nav.classList.remove('active'));
            // 클릭된 링크에 active 클래스 추가
            this.classList.add('active');
            
            // 모든 섹션 숨기기
            sections.forEach(section => section.classList.remove('active'));
            
            // 해당 섹션 보이기
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('섹션 활성화:', targetId);
            }
            
            // 생물 관리 섹션이 활성화될 때 생물들을 다시 렌더링
            if (targetId === 'creatures') {
                console.log('생물 관리 섹션 활성화됨');
                setTimeout(() => {
                    renderAdminCreatures();
                }, 200);
            }
            
            // 생물군계 관리 섹션이 활성화될 때 생물군계들을 다시 렌더링
            if (targetId === 'biomes') {
                console.log('생물군계 관리 섹션 활성화됨');
                setTimeout(() => {
                    renderAdminBiomes();
                }, 200);
            }
        });
    });

    // 통계 숫자 애니메이션
    animateNumbers();
    
    // 실시간 시간 업데이트
    updateActivityTimes();
    setInterval(updateActivityTimes, 60000); // 1분마다 업데이트
    
    // 생물 데이터 로드
    console.log('생물 데이터 로드 시작');
    loadCreaturesFromStorage();
    
    // 생물군계 데이터 로드
    console.log('생물군계 데이터 로드 시작');
    loadBiomesFromStorage();
    
    // 초기 관리자 페이지 생물 카드 렌더링 (여러 번 시도)
    setTimeout(() => {
        console.log('첫 번째 렌더링 시도');
        renderAdminCreatures();
        renderAdminBiomes();
    }, 100);
    
    setTimeout(() => {
        console.log('두 번째 렌더링 시도');
        renderAdminCreatures();
        renderAdminBiomes();
        // 필터 버튼 설정
        setupAdminFilterButtons();
        setupAdminBiomeFilterButtons();
    }, 1000);
    
    // 새 생물 추가 폼 제출 이벤트
    const addForm = document.getElementById('addCreatureForm');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // 새 ID 생성
            const newId = Math.max(...Object.keys(creaturesData).map(Number), 0) + 1;
            
            // 새 생물 데이터 생성
            const newCreature = {
                name: formData.get('creatureName'),
                emoji: formData.get('creatureEmoji'),
                danger: formData.get('creatureDanger'),
                description: formData.get('creatureDescription'),
                type: formData.get('creatureType'),
                image: formData.get('creatureImage') || '',
                isVideo: formData.get('creatureIsVideo') === 'true'
            };
            
            // 데이터에 추가
            creaturesData[newId] = newCreature;
            
            // localStorage에 저장
            saveCreaturesToStorage();
            
            // 관리자 페이지 다시 렌더링
            renderAdminCreatures();
            
            // 모달 닫기
            closeAddModal();
            
            // 성공 알림
            showNotification('새 생물이 성공적으로 추가되었습니다!', 'success');
        });
    }
    
    // 생물 수정 폼 제출 이벤트
    const editForm = document.getElementById('editCreatureForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const creatureId = this.dataset.creatureId;
            const formData = new FormData(this);
            
            // 데이터 업데이트
            creaturesData[creatureId] = {
                name: formData.get('creatureName'),
                emoji: formData.get('creatureEmoji'),
                danger: formData.get('creatureDanger'),
                description: formData.get('creatureDescription'),
                type: formData.get('creatureType'),
                image: formData.get('creatureImage') || '',
                isVideo: formData.get('creatureIsVideo') === 'true'
            };
            
            // localStorage에 저장
            saveCreaturesToStorage();
            
            // 관리자 페이지 다시 렌더링
            renderAdminCreatures();
            
            // 모달 닫기
            closeEditModal();
            
            // 성공 알림
            showNotification('생물 정보가 성공적으로 업데이트되었습니다!', 'success');
        });
    }
    
    // 새 생물군계 추가 폼 제출 이벤트
    const addBiomeForm = document.getElementById('addBiomeForm');
    if (addBiomeForm) {
        addBiomeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // 새 ID 생성
            const newId = Math.max(...Object.keys(biomesData).map(Number), 0) + 1;
            
            // 서식 생물 배열로 변환
            const creaturesText = formData.get('biomeCreatures');
            const creatures = creaturesText ? creaturesText.split(',').map(c => c.trim()).filter(c => c) : [];
            
            // 새 생물군계 데이터 생성
            const newBiome = {
                name: formData.get('biomeName'),
                emoji: formData.get('biomeEmoji'),
                depth: formData.get('biomeDepth'),
                type: formData.get('biomeDanger'),
                description: formData.get('biomeDescription'),
                creatures: creatures,
                image: formData.get('biomeImage') || '',
                isVideo: formData.get('biomeIsVideo') === 'true'
            };
            
            // 데이터에 추가
            biomesData[newId] = newBiome;
            
            // localStorage에 저장
            saveBiomesToStorage();
            
            // 관리자 페이지 다시 렌더링
            renderAdminBiomes();
            
            // 모달 닫기
            closeAddBiomeModal();
            
            // 성공 알림
            showNotification('새 생물군계가 성공적으로 추가되었습니다!', 'success');
        });
    }
    
    // 생물군계 수정 폼 제출 이벤트
    const editBiomeForm = document.getElementById('editBiomeForm');
    if (editBiomeForm) {
        editBiomeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const biomeId = this.dataset.biomeId;
            const formData = new FormData(this);
            
            // 서식 생물 배열로 변환
            const creaturesText = formData.get('biomeCreatures');
            const creatures = creaturesText ? creaturesText.split(',').map(c => c.trim()).filter(c => c) : [];
            
            // 데이터 업데이트
            biomesData[biomeId] = {
                name: formData.get('biomeName'),
                emoji: formData.get('biomeEmoji'),
                depth: formData.get('biomeDepth'),
                type: formData.get('biomeDanger'),
                description: formData.get('biomeDescription'),
                creatures: creatures,
                image: formData.get('biomeImage') || ''
            };
            
            // localStorage에 저장
            saveBiomesToStorage();
            
            // 관리자 페이지 다시 렌더링
            renderAdminBiomes();
            
            // 모달 닫기
            closeEditBiomeModal();
            
            // 성공 알림
            showNotification('생물군계 정보가 성공적으로 업데이트되었습니다!', 'success');
        });
    }
    window.addEventListener('click', function(e) {
        const editModal = document.getElementById('editCreatureModal');
        const addModal = document.getElementById('addCreatureModal');
        const editBiomeModal = document.getElementById('editBiomeModal');
        const addBiomeModal = document.getElementById('addBiomeModal');
        
        if (e.target === editModal) {
            closeEditModal();
        }
        if (e.target === addModal) {
            closeAddModal();
        }
        if (e.target === editBiomeModal) {
            closeEditBiomeModal();
        }
        if (e.target === addBiomeModal) {
            closeAddBiomeModal();
        }
    });
    
    // 이모지 입력 필드 변경 시 선택 상태 업데이트
    const emojiInput = document.getElementById('creatureEmoji');
    if (emojiInput) {
        emojiInput.addEventListener('input', function() {
            updateEmojiSelection(this.value);
        });
    }
    
    const newEmojiInput = document.getElementById('newCreatureEmoji');
    if (newEmojiInput) {
        newEmojiInput.addEventListener('input', function() {
            selectEmojiForAdd(this.value);
        });
    }
});

// 숫자 애니메이션 함수
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(element => {
        const finalNumber = parseInt(element.textContent.replace(/,/g, ''));
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber).toLocaleString();
        }, 30);
    });
}

// 활동 시간 업데이트
function updateActivityTimes() {
    const activityTimes = document.querySelectorAll('.activity-time');
    const times = ['방금 전', '15분 전', '1시간 전', '3시간 전', '5시간 전'];
    
    activityTimes.forEach((element, index) => {
        if (times[index]) {
            element.textContent = times[index];
        }
    });
}

// 검색 기능
function searchUsers() {
    const searchInput = document.querySelector('.search-input');
    const userRows = document.querySelectorAll('.user-table tbody tr');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        userRows.forEach(row => {
            const username = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();
            
            if (username.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// 버튼 클릭 이벤트
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        if (confirm('정말로 삭제하시겠습니까?')) {
            e.target.closest('tr')?.remove();
            showNotification('삭제되었습니다.', 'success');
        }
    }
    
    if (e.target.classList.contains('btn-ban')) {
        if (confirm('이 사용자를 정지시키겠습니까?')) {
            const statusElement = e.target.closest('tr').querySelector('.status');
            statusElement.textContent = '정지됨';
            statusElement.className = 'status banned';
            statusElement.style.background = 'rgba(255, 51, 51, 0.2)';
            statusElement.style.color = '#ff3333';
            statusElement.style.border = '1px solid #ff3333';
            showNotification('사용자가 정지되었습니다.', 'warning');
        }
    }
    
    if (e.target.classList.contains('logout-btn')) {
        if (confirm('로그아웃 하시겠습니까?')) {
            showNotification('로그아웃되었습니다.', 'info');
            // 실제로는 로그인 페이지로 리다이렉트
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }
});

// 알림 표시 함수
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#00ff80';
            notification.style.color = '#003300';
            break;
        case 'warning':
            notification.style.background = '#ffcc00';
            notification.style.color = '#333300';
            break;
        case 'error':
            notification.style.background = '#ff3333';
            break;
        default:
            notification.style.background = '#00ccff';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 검색 기능 초기화
searchUsers();

// ===== 생물군계 관리 함수들 =====

// 관리자 페이지 생물군계 카드들을 동적으로 생성
function renderAdminBiomes(filter = 'all') {
    console.log('renderAdminBiomes 함수 호출됨. 필터:', filter);
    
    const grid = document.getElementById('admin-biomes-grid');
    if (!grid) {
        console.error('admin-biomes-grid 요소를 찾을 수 없습니다.');
        return;
    }
    
    renderBiomesToGrid(grid, filter);
}

// 실제 생물군계 카드 렌더링 함수
function renderBiomesToGrid(grid, filter = 'all') {
    console.log('생물군계 카드 렌더링 시작:', Object.keys(biomesData).length, '개 생물군계, 필터:', filter);
    
    grid.innerHTML = '';
    
    if (Object.keys(biomesData).length === 0) {
        grid.innerHTML = '<div style="color: #ccffff; text-align: center; grid-column: 1/-1; padding: 2rem;">등록된 생물군계가 없습니다.</div>';
        return;
    }
    
    let displayedCount = 0;
    Object.entries(biomesData).forEach(([id, biome]) => {
        // 필터 적용
        if (filter === 'all' || biome.type === filter) {
            console.log('생물군계 카드 생성:', biome.name);
            
            const card = document.createElement('div');
            card.className = 'creature-card';
            card.setAttribute('data-biome-id', id);
            
            const creaturesText = biome.creatures ? biome.creatures.join(', ') : '없음';
            
            card.innerHTML = `
                <div class="creature-image">${biome.emoji}</div>
                <h4>${biome.name}</h4>
                <p>수심: ${biome.depth}</p>
                <p>위험도: ${biome.type}</p>
                <p class="creature-description">${biome.description}</p>
                <p class="biome-creatures"><strong>서식 생물:</strong> ${creaturesText}</p>
                <div class="creature-actions-small">
                    <button class="btn-edit" onclick="editBiome(${id})">수정</button>
                    <button class="btn-delete" onclick="deleteBiome(${id})">삭제</button>
                </div>
            `;
            
            grid.appendChild(card);
            displayedCount++;
        }
    });
    
    if (displayedCount === 0) {
        grid.innerHTML = '<div style="color: #ccffff; text-align: center; grid-column: 1/-1; padding: 2rem;">해당 유형의 생물군계가 없습니다.</div>';
    }
    
    console.log('생물군계 카드 렌더링 완료. 총', displayedCount, '개 카드 생성됨');
}

// 관리자 생물군계 필터 버튼 설정
function setupAdminBiomeFilterButtons() {
    const filterButtons = document.querySelectorAll('.admin-biome-filter-btn');
    console.log('관리자 생물군계 필터 버튼 설정:', filterButtons.length, '개');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('관리자 생물군계 필터 버튼 클릭:', this.textContent, this.dataset.filter);
            
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 필터 적용
            const filter = this.dataset.filter;
            renderAdminBiomes(filter);
        });
    });
}

// 생물군계 삭제 기능
function deleteBiome(biomeId) {
    if (confirm('정말로 이 생물군계를 삭제하시겠습니까?')) {
        delete biomesData[biomeId];
        saveBiomesToStorage();
        renderAdminBiomes();
        showNotification('생물군계가 삭제되었습니다.', 'success');
    }
}

// 생물군계 수정 함수
function editBiome(biomeId) {
    const biome = biomesData[biomeId];
    if (!biome) return;
    
    // 모달 폼에 데이터 채우기
    document.getElementById('biomeName').value = biome.name;
    document.getElementById('biomeEmoji').value = biome.emoji;
    document.getElementById('biomeDepth').value = biome.depth;
    document.getElementById('biomeDanger').value = biome.type;
    document.getElementById('biomeDescription').value = biome.description;
    document.getElementById('biomeCreatures').value = biome.creatures ? biome.creatures.join(', ') : '';
    document.getElementById('biomeImage').value = biome.image || '';
    document.getElementById('biomeIsVideo').value = biome.isVideo ? 'true' : 'false';
    
    // 현재 편집 중인 생물군계 ID 저장
    document.getElementById('editBiomeForm').dataset.biomeId = biomeId;
    
    // 모달 표시
    document.getElementById('editBiomeModal').style.display = 'block';
    
    // 선택된 이모지 하이라이트
    updateBiomeEmojiSelection(biome.emoji);
}

// 생물군계 모달 닫기 함수들
function closeEditBiomeModal() {
    document.getElementById('editBiomeModal').style.display = 'none';
    document.getElementById('editBiomeForm').reset();
    document.querySelectorAll('#editBiomeModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
    });
}

function closeAddBiomeModal() {
    document.getElementById('addBiomeModal').style.display = 'none';
    document.getElementById('addBiomeForm').reset();
    document.querySelectorAll('#addBiomeModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
    });
}

// 새 생물군계 추가 모달 열기
function openAddBiomeModal() {
    document.getElementById('addBiomeModal').style.display = 'block';
}

// 생물군계 이모지 선택 함수들
function selectBiomeEmoji(emoji) {
    document.getElementById('biomeEmoji').value = emoji;
    updateBiomeEmojiSelection(emoji);
}

function selectEmojiForAddBiome(emoji) {
    document.getElementById('newBiomeEmoji').value = emoji;
    document.querySelectorAll('#addBiomeModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === emoji) {
            option.classList.add('selected');
        }
    });
}

// 생물군계 이모지 선택 상태 업데이트
function updateBiomeEmojiSelection(selectedEmoji) {
    document.querySelectorAll('#editBiomeModal .emoji-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === selectedEmoji) {
            option.classList.add('selected');
        }
    });
}

// 생물군계 디버깅 함수
function debugBiomes() {
    console.log('=== 생물군계 디버그 정보 ===');
    console.log('현재 생물군계 데이터:', biomesData);
    console.log('생물군계 개수:', Object.keys(biomesData).length);
    console.log('localStorage 생물군계 데이터:', localStorage.getItem('subnautica_biomes'));
    
    const grid = document.getElementById('admin-biomes-grid');
    console.log('생물군계 그리드 요소:', grid);
    
    if (grid) {
        console.log('생물군계 그리드 자식 요소 개수:', grid.children.length);
    }
}

// 생물군계 강제 렌더링 함수
function forceRenderBiomes() {
    console.log('생물군계 강제 렌더링 시작');
    
    if (Object.keys(biomesData).length === 0) {
        console.log('생물군계 데이터가 없어서 기본 데이터 로드');
        biomesData = getDefaultBiomes();
        saveBiomesToStorage();
    }
    
    let grid = document.getElementById('admin-biomes-grid');
    
    if (!grid) {
        console.log('ID로 생물군계 그리드를 찾을 수 없음. 클래스로 찾기 시도');
        grid = document.querySelector('.creature-grid');
    }
    
    if (grid) {
        renderBiomesToGrid(grid);
    } else {
        console.error('생물군계 그리드 요소를 생성할 수 없음');
    }
}

// 생물군계 데이터 초기화
function resetBiomeData() {
    if (confirm('모든 생물군계 데이터를 초기화하시겠습니까?')) {
        localStorage.removeItem('subnautica_biomes');
        loadBiomesFromStorage();
        renderAdminBiomes();
        showNotification('생물군계 데이터가 초기화되었습니다.', 'info');
    }
}

// 생물군계 이미지 데이터 강제 업데이트 함수
function forceUpdateBiomeImages() {
    if (confirm('모든 생물군계에 이미지 데이터를 추가하시겠습니까?\n사용자가 수정한 내용은 보존됩니다.')) {
        console.log('생물군계 이미지 데이터 업데이트 시작 (사용자 수정 사항 보존)');
        
        const defaultData = getDefaultBiomes();
        
        // 기존 데이터와 병합 (사용자 수정 사항 보존)
        Object.keys(defaultData).forEach(id => {
            if (biomesData[id]) {
                // 이미지 정보가 없는 경우에만 추가
                if (!biomesData[id].hasOwnProperty('image')) {
                    biomesData[id].image = defaultData[id].image;
                    console.log(`생물군계 ${biomesData[id].name}에 이미지 정보 추가`);
                }
            } else {
                // 새로운 생물군계면 기본값 사용
                biomesData[id] = defaultData[id];
                console.log(`새 생물군계 ${defaultData[id].name} 추가`);
            }
        });
        
        saveBiomesToStorage();
        renderAdminBiomes();
        showNotification('생물군계 이미지 데이터가 업데이트되었습니다!\n사용자 수정 사항은 보존되었습니다.', 'success');
    }
}