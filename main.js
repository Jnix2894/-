// 생물 데이터 (localStorage에서 로드)
let creaturesData = {};
let biomesData = {};
let isExpanded = false;
let isBiomesExpanded = false;
const INITIAL_DISPLAY_COUNT = 6;

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('메인 사이트 DOM 로드 완료');
    loadCreaturesData();
    loadBiomesData();
    displayCreatures();
    displayBiomes();
    setupFilterButtons();
    setupBiomeFilterButtons();
    setupShowMoreButton();
    setupShowMoreBiomesButton();
});

// localStorage에서 생물 데이터 로드
function loadCreaturesData() {
    console.log('생물 데이터 로드 시작...');
    const savedData = localStorage.getItem('subnautica_creatures');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            const defaultData = getDefaultCreaturesData();
            
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
            
            saveCreaturesData();
            console.log('데이터 병합 완료:', Object.keys(creaturesData).length, '개 생물');
        } catch (e) {
            console.error('데이터 파싱 오류:', e);
            creaturesData = getDefaultCreaturesData();
            saveCreaturesData();
        }
    } else {
        console.log('저장된 데이터가 없음. 기본 데이터 사용.');
        creaturesData = getDefaultCreaturesData();
        saveCreaturesData();
    }
}

// 기본 생물 데이터
function getDefaultCreaturesData() {
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
            emoji: '🪱',
            danger: '주의',
            description: '동굴에서 서식하는 생물로 오로라호 승무원의 시체를 먹은 것으로 확인된 청소부 역할을 하는 생물. 동굴 탐험 시 주의가 필요하다.',
            type: '중성',
            image: 'images/게오징어.webp' // 임시로 게오징어 이미지 사용
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
            name: '공간도약자',
            emoji: '⚡',
            danger: '극위험',
            description: '순간이동 능력을 가진 특수한 생물. 정지소총으로도 제압하기 어려운 유일한 생물로, 예측 불가능한 움직임으로 플레이어를 위협한다.',
            type: '포식자',
            image: 'images/공간도약자.webp'
        },
        10: {
            name: '산호등 레비아탄',
            emoji: '🪸',
            danger: '안전',
            description: '거대하지만 온순한 레비아탄. 등에 산고가 자라고 있으며 플레이어에게 해를 끼치지 않는다. 대부분의 플레이어가 처음 만나는 레비아탄급 생물.',
            type: '초식동물',
            image: 'images/산호등 레비아탄.webp'
        },
        11: {
            name: '바다황제 레비아탄',
            emoji: '👑',
            danger: '안전',
            description: '서브노티카의 핵심 스토리와 관련된 지적 생명체. 텔레파시 능력을 가지고 있으며 플레이어와 소통할 수 있는 유일한 레비아탄.',
            type: '중성',
            image: 'images/바다황제 레비아탄.webp'
        },
        12: {
            name: '가시가오리',
            emoji: '🐟',
            danger: '주의',
            description: '독성 가시를 가진 가오리. 접촉 시 독 데미지를 입히므로 주의가 필요하다. 얕은 바다에서 주로 발견된다.',
            type: '중성',
            image: 'images/게오징어.webp' // 임시로 게오징어 이미지 사용
        },
        13: {
            name: '크래시피쉬',
            emoji: '💥',
            danger: '위험',
            description: '폭발하는 물고기. 플레이어나 다른 생물에게 접근하면 자폭하여 큰 피해를 준다. 크래시피쉬 파우더는 폭발물 제작에 사용된다.',
            type: '중성',
            image: 'images/폭파고기.webp'
        },
        14: {
            name: '메스머',
            emoji: '👁️',
            danger: '주의',
            description: '최면 능력을 가진 생물. 플레이어의 시야를 흐리게 하고 조종하려 한다. 아름다운 외모와 달리 위험한 능력을 가지고 있다.',
            type: '중성',
            image: 'images/메스머.webp'
        }
    };
}

// localStorage에 생물 데이터 저장
function saveCreaturesData() {
    localStorage.setItem('subnautica_creatures', JSON.stringify(creaturesData));
    console.log('메인 사이트 데이터 저장됨:', Object.keys(creaturesData).length, '개 생물');
}

// 생물군계 데이터 로드
function loadBiomesData() {
    console.log('생물군계 데이터 로드 시작...');
    const savedData = localStorage.getItem('subnautica_biomes');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            const defaultData = getDefaultBiomesData();
            
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
                        biomesData[id].isVideo = defaultData[id].isVideo;
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
            
            saveBiomesData();
            console.log('생물군계 데이터 병합 완료:', Object.keys(biomesData).length, '개 생물군계');
        } catch (e) {
            console.error('생물군계 데이터 파싱 오류:', e);
            biomesData = getDefaultBiomesData();
            saveBiomesData();
        }
    } else {
        console.log('저장된 생물군계 데이터가 없음. 기본 데이터 사용.');
        biomesData = getDefaultBiomesData();
        saveBiomesData();
    }
}

// 기본 생물군계 데이터
function getDefaultBiomesData() {
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
            description: '거대한 미역덩굴이 자라는 숲 같은 지역. 메스머가 서식하지만 조심스럽게 탐험할 수 있다. 미역덩굴은 중요한 제작 재료다.',
            type: '주의',
            creatures: ['메스머', '피퍼', '부유고기'],
            image: 'images/해초숲.webp'
        },
        3: {
            name: '초원 평야',
            emoji: '🌾',
            depth: '50-170m',
            description: '붉은 조류가 자생하는 평원 지대. 사암에서 은과 금을 채굴할 수 있으며, 산호등 레비아탄이 서식한다. 모래상어와 호랑이풀을 조심해야 한다.',
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
            name: '용암 지대',
            emoji: '🌋',
            depth: '1200-1700m',
            description: '행성의 가장 깊은 곳으로 용암이 흐르는 극한 지역. 해룡 레비아탄이 서식하며 이온 큐브와 크리스탈린 황을 얻을 수 있다.',
            type: '극위험',
            creatures: ['해룡 레비아탄', '라바 리저드', '라바 유충'],
            image: 'images/용암지대.mp4',
            isVideo: true
        },
        7: {
            name: '잃어버린 강',
            emoji: '🌊',
            depth: '500-900m',
            description: '지하 강처럼 생긴 독특한 지형. 유령 레비아탄의 아성체들이 서식하며, 고대 해골과 화석을 발견할 수 있다.',
            type: '극위험',
            creatures: ['유령 레비아탄 (아성체)', '리버 프라운더', '스파인피쉬'],
            image: 'images/잃어버린강.webp'
        },
        8: {
            name: '핏빛 해초 숲',
            emoji: '🩸',
            depth: '200-500m',
            description: '붉은 해초가 자라는 어두운 지역. 크랩스퀴드와 워퍼가 서식하며, 우라니나이트를 채굴할 수 있다.',
            type: '위험',
            creatures: ['크랩스퀴드', '워퍼', '크랩 스네이크'],
            image: 'images/핏빛해초숲.webp'
        },
        9: {
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
function saveBiomesData() {
    localStorage.setItem('subnautica_biomes', JSON.stringify(biomesData));
    console.log('생물군계 데이터 저장됨:', Object.keys(biomesData).length, '개 생물군계');
}

// 생물군계 표시
function displayBiomes(filter = 'all') {
    console.log('생물군계 표시 시작. 필터:', filter);
    const container = document.getElementById('biomes-grid');
    if (!container) {
        console.error('biomes-grid 요소를 찾을 수 없습니다.');
        return;
    }
    
    container.innerHTML = '';
    
    let displayedCount = 0;
    let totalCount = 0;
    const biomes = [];
    
    // 필터링된 생물군계들을 배열로 수집
    Object.entries(biomesData).forEach(([id, biome]) => {
        if (filter === 'all' || biome.type === filter) {
            biomes.push(biome);
            totalCount++;
        }
    });
    
    // 생물군계들을 표시 (처음에는 6개만)
    biomes.forEach((biome, index) => {
        const biomeElement = createBiomeElement(biome);
        
        // 6개 이후는 숨김 처리
        if (index >= INITIAL_DISPLAY_COUNT && !isBiomesExpanded) {
            biomeElement.classList.add('hidden');
        }
        
        container.appendChild(biomeElement);
        displayedCount++;
    });
    
    console.log('표시된 생물군계 수:', displayedCount);
    
    // 더보기 버튼 업데이트
    updateShowMoreBiomesButton(totalCount);
    
    if (displayedCount === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #ccffff; padding: 2rem;">해당 유형의 생물군계가 없습니다.</div>';
    }
}

// 생물군계 요소 생성
function createBiomeElement(biome) {
    const div = document.createElement('div');
    div.className = 'biome-item';
    div.style.cursor = 'pointer';
    div.innerHTML = `
        <span class="biome-emoji">${biome.emoji}</span>
        <h3>${biome.name}</h3>
        <div class="biome-depth">수심: ${biome.depth}</div>
        <div class="biome-danger danger-${biome.type}">위험도: ${biome.type}</div>
        <p>${biome.description}</p>
    `;
    
    // 클릭 이벤트 추가
    div.addEventListener('click', function() {
        openBiomeModal(biome);
    });
    
    return div;
}

// 생물군계 필터 버튼 설정
function setupBiomeFilterButtons() {
    console.log('생물군계 필터 버튼 설정 시작');
    const filterButtons = document.querySelectorAll('.biome-filter-btn');
    console.log('찾은 생물군계 필터 버튼 수:', filterButtons.length);
    
    filterButtons.forEach((button, index) => {
        console.log('버튼', index, ':', button.textContent, '데이터 필터:', button.dataset.filter);
        
        button.addEventListener('click', function() {
            console.log('생물군계 필터 버튼 클릭됨:', this.textContent, '필터:', this.dataset.filter);
            
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 필터 변경 시 접기 상태로 리셋
            isBiomesExpanded = false;
            
            // 필터 적용
            const filter = this.dataset.filter;
            displayBiomes(filter);
        });
    });
}

// 생물군계 더보기 버튼 업데이트
function updateShowMoreBiomesButton(totalCount) {
    const showMoreBtn = document.getElementById('show-more-biomes-btn');
    const hiddenCountSpan = document.getElementById('hidden-biomes-count');
    
    if (!showMoreBtn || !hiddenCountSpan) return;
    
    const hiddenCount = Math.max(0, totalCount - INITIAL_DISPLAY_COUNT);
    
    if (totalCount <= INITIAL_DISPLAY_COUNT) {
        showMoreBtn.classList.add('hidden');
    } else {
        showMoreBtn.classList.remove('hidden');
        
        if (isBiomesExpanded) {
            showMoreBtn.textContent = '생물군계 접기';
        } else {
            hiddenCountSpan.textContent = hiddenCount;
            showMoreBtn.innerHTML = `더 많은 생물군계 보기 (<span id="hidden-biomes-count">${hiddenCount}</span>개)`;
        }
    }
}

// 생물군계 더보기 버튼 설정
function setupShowMoreBiomesButton() {
    const showMoreBtn = document.getElementById('show-more-biomes-btn');
    if (!showMoreBtn) return;
    
    showMoreBtn.addEventListener('click', function() {
        isBiomesExpanded = !isBiomesExpanded;
        
        const hiddenBiomes = document.querySelectorAll('.biome-item.hidden');
        
        if (isBiomesExpanded) {
            // 모든 숨겨진 생물군계 표시
            hiddenBiomes.forEach(biome => {
                biome.classList.remove('hidden');
            });
            this.textContent = '생물군계 접기';
        } else {
            // 6개 이후 생물군계들 숨기기
            const allBiomes = document.querySelectorAll('.biome-item');
            allBiomes.forEach((biome, index) => {
                if (index >= INITIAL_DISPLAY_COUNT) {
                    biome.classList.add('hidden');
                }
            });
            
            const totalCount = document.querySelectorAll('.biome-item').length;
            const hiddenCount = Math.max(0, totalCount - INITIAL_DISPLAY_COUNT);
            this.innerHTML = `더 많은 생물군계 보기 (<span id="hidden-biomes-count">${hiddenCount}</span>개)`;
        }
    });
}
function displayCreatures(filter = 'all') {
    console.log('생물 표시 시작. 필터:', filter);
    const container = document.getElementById('creatures-grid');
    if (!container) {
        console.error('creatures-grid 요소를 찾을 수 없습니다.');
        return;
    }
    
    container.innerHTML = '';
    
    let displayedCount = 0;
    let totalCount = 0;
    const creatures = [];
    
    // 필터링된 생물들을 배열로 수집
    Object.entries(creaturesData).forEach(([id, creature]) => {
        if (filter === 'all' || creature.type === filter) {
            creatures.push(creature);
            totalCount++;
        }
    });
    
    // 생물들을 표시 (처음에는 6개만)
    creatures.forEach((creature, index) => {
        const creatureElement = createCreatureElement(creature);
        
        // 6개 이후는 숨김 처리
        if (index >= INITIAL_DISPLAY_COUNT && !isExpanded) {
            creatureElement.classList.add('hidden');
        }
        
        container.appendChild(creatureElement);
        displayedCount++;
    });
    
    console.log('표시된 생물 수:', displayedCount);
    
    // 더보기 버튼 업데이트
    updateShowMoreButton(totalCount);
    
    if (displayedCount === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #ccffff; padding: 2rem;">해당 유형의 생물이 없습니다.</div>';
    }
}

// 더보기 버튼 업데이트
function updateShowMoreButton(totalCount) {
    const showMoreBtn = document.getElementById('show-more-btn');
    const hiddenCountSpan = document.getElementById('hidden-count');
    
    if (!showMoreBtn || !hiddenCountSpan) return;
    
    const hiddenCount = Math.max(0, totalCount - INITIAL_DISPLAY_COUNT);
    
    if (totalCount <= INITIAL_DISPLAY_COUNT) {
        showMoreBtn.classList.add('hidden');
    } else {
        showMoreBtn.classList.remove('hidden');
        
        if (isExpanded) {
            showMoreBtn.textContent = '생물 접기';
        } else {
            hiddenCountSpan.textContent = hiddenCount;
            showMoreBtn.innerHTML = `더 많은 생물 보기 (<span id="hidden-count">${hiddenCount}</span>개)`;
        }
    }
}

// 더보기 버튼 설정
function setupShowMoreButton() {
    const showMoreBtn = document.getElementById('show-more-btn');
    if (!showMoreBtn) return;
    
    showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        const hiddenCreatures = document.querySelectorAll('.creature-item.hidden');
        
        if (isExpanded) {
            // 모든 숨겨진 생물 표시
            hiddenCreatures.forEach(creature => {
                creature.classList.remove('hidden');
            });
            this.textContent = '생물 접기';
        } else {
            // 6개 이후 생물들 숨기기
            const allCreatures = document.querySelectorAll('.creature-item');
            allCreatures.forEach((creature, index) => {
                if (index >= INITIAL_DISPLAY_COUNT) {
                    creature.classList.add('hidden');
                }
            });
            
            const totalCount = document.querySelectorAll('.creature-item').length;
            const hiddenCount = Math.max(0, totalCount - INITIAL_DISPLAY_COUNT);
            this.innerHTML = `더 많은 생물 보기 (<span id="hidden-count">${hiddenCount}</span>개)`;
        }
    });
}

// 생물 요소 생성
function createCreatureElement(creature) {
    const div = document.createElement('div');
    div.className = 'creature-item';
    div.style.cursor = 'pointer'; // 클릭 가능함을 표시
    div.innerHTML = `
        <span class="creature-emoji">${creature.emoji}</span>
        <h3>${creature.name}</h3>
        <div class="creature-danger danger-${creature.danger}">위험도: ${creature.danger}</div>
        <p>${creature.description}</p>
    `;
    
    // 클릭 이벤트 추가
    div.addEventListener('click', function() {
        openCreatureModal(creature);
    });
    
    return div;
}

// 필터 버튼 설정
function setupFilterButtons() {
    console.log('필터 버튼 설정 시작');
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('찾은 필터 버튼 수:', filterButtons.length);
    
    filterButtons.forEach((button, index) => {
        console.log('버튼', index, ':', button.textContent, '데이터 필터:', button.dataset.filter);
        
        button.addEventListener('click', function() {
            console.log('필터 버튼 클릭됨:', this.textContent, '필터:', this.dataset.filter);
            
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 필터 변경 시 접기 상태로 리셋
            isExpanded = false;
            
            // 필터 적용
            const filter = this.dataset.filter;
            displayCreatures(filter);
        });
    });
}

// 관리자 페이지에서 호출할 수 있는 함수들
window.updateMainSiteCreatures = function() {
    console.log('메인 사이트 생물 업데이트 요청');
    loadCreaturesData();
    displayCreatures();
};

window.addCreatureToMainSite = function(creature) {
    const newId = Math.max(...Object.keys(creaturesData).map(Number)) + 1;
    creaturesData[newId] = creature;
    saveCreaturesData();
    displayCreatures();
    return newId;
};

// 이미지 데이터 강제 업데이트 함수
window.forceUpdateCreatureImages = function() {
    console.log('이미지 데이터 업데이트 시작 (사용자 수정 사항 보존)');
    
    const defaultData = getDefaultCreaturesData();
    
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
    
    saveCreaturesData();
    displayCreatures();
    console.log('이미지 데이터 업데이트 완료 (사용자 수정 사항 보존됨)');
    alert('생물 이미지 데이터가 업데이트되었습니다!\n사용자가 수정한 내용은 보존되었습니다.');
};

// 생물군계 상세 정보 모달 열기
function openBiomeModal(biome) {
    console.log('생물군계 모달 열기:', biome.name);
    
    // 모달 요소들 가져오기
    const modal = document.getElementById('biomeDetailModal');
    const nameElement = document.getElementById('modalBiomeName');
    const depthElement = document.getElementById('modalBiomeDepth');
    const dangerElement = document.getElementById('modalBiomeDanger');
    const descriptionElement = document.getElementById('modalBiomeDescription');
    const creaturesElement = document.getElementById('modalBiomeCreatures');
    
    if (!modal || !nameElement || !depthElement || !dangerElement || !descriptionElement) {
        console.error('생물군계 모달 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 모달 내용 업데이트
    nameElement.textContent = biome.name;
    depthElement.textContent = `수심: ${biome.depth}`;
    dangerElement.textContent = `위험도: ${biome.type}`;
    dangerElement.className = `biome-modal-danger danger-${biome.type}`;
    descriptionElement.textContent = biome.description;
    
    // 생물 목록 표시
    if (creaturesElement && biome.creatures) {
        creaturesElement.innerHTML = biome.creatures.map(creature => 
            `<span class="creature-tag">${creature}</span>`
        ).join('');
    }
    
    // 이미지 로드
    loadBiomeMedia(biome);
    
    // 모달 표시
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

// 생물군계 미디어(이미지/비디오) 로드
function loadBiomeMedia(biome) {
    const imageElement = document.getElementById('modalBiomeImage');
    const videoElement = document.getElementById('modalBiomeVideo');
    const placeholderElement = document.getElementById('modalBiomeImagePlaceholder');
    
    if (!imageElement || !videoElement || !placeholderElement) {
        console.error('생물군계 미디어 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 모든 미디어 요소 숨기기
    imageElement.style.display = 'none';
    videoElement.style.display = 'none';
    placeholderElement.style.display = 'flex';
    
    if (!biome.image) {
        placeholderElement.innerHTML = `
            <p>이미지 없음</p>
            <small>이 생물군계의 이미지가 준비되지 않았습니다</small>
        `;
        return;
    }
    
    if (biome.isVideo) {
        // 비디오 로드
        console.log('생물군계 비디오 로드:', biome.image);
        const videoSource = videoElement.querySelector('source');
        videoSource.src = biome.image;
        videoElement.load();
        
        videoElement.onloadeddata = function() {
            console.log('생물군계 비디오 로드 완료');
            placeholderElement.style.display = 'none';
            videoElement.style.display = 'block';
        };
        
        videoElement.onerror = function() {
            console.error('생물군계 비디오 로드 실패:', biome.image);
            placeholderElement.innerHTML = `
                <p>비디오 로드 실패</p>
                <small>비디오를 불러올 수 없습니다</small>
            `;
        };
    } else {
        // 이미지 로드
        console.log('생물군계 이미지 로드:', biome.image);
        imageElement.onload = function() {
            console.log('생물군계 이미지 로드 완료');
            placeholderElement.style.display = 'none';
            imageElement.style.display = 'block';
        };
        
        imageElement.onerror = function() {
            console.error('생물군계 이미지 로드 실패:', biome.image);
            placeholderElement.innerHTML = `
                <p>이미지 로드 실패</p>
                <small>이미지를 불러올 수 없습니다</small>
            `;
        };
        
        imageElement.src = biome.image;
        imageElement.alt = biome.name;
    }
}

// 생물군계 상세 정보 모달 닫기
function closeBiomeModal() {
    console.log('생물군계 모달 닫기');
    const modal = document.getElementById('biomeDetailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 배경 스크롤 복원
    }
}
function openCreatureModal(creature) {
    console.log('생물 모달 열기:', creature.name);
    
    // 모달 요소들 가져오기
    const modal = document.getElementById('creatureDetailModal');
    const nameElement = document.getElementById('modalCreatureName');
    const dangerElement = document.getElementById('modalCreatureDanger');
    const typeElement = document.getElementById('modalCreatureType');
    const descriptionElement = document.getElementById('modalCreatureDescription');
    
    if (!modal || !nameElement || !dangerElement || !typeElement || !descriptionElement) {
        console.error('모달 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 모달 내용 업데이트
    nameElement.textContent = creature.name;
    dangerElement.textContent = `위험도: ${creature.danger}`;
    dangerElement.className = `creature-modal-danger danger-${creature.danger}`;
    typeElement.textContent = `유형: ${creature.type}`;
    descriptionElement.textContent = creature.description;
    
    // 이미지/비디오 로드
    loadCreatureMedia(creature);
    
    // 모달 표시
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

// 생물 미디어(이미지/비디오) 로드
function loadCreatureMedia(creature) {
    const imageElement = document.getElementById('modalCreatureImage');
    const videoElement = document.getElementById('modalCreatureVideo');
    const placeholderElement = document.getElementById('modalImagePlaceholder');
    
    if (!imageElement || !videoElement || !placeholderElement) {
        console.error('미디어 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 모든 미디어 요소 숨기기
    imageElement.style.display = 'none';
    videoElement.style.display = 'none';
    placeholderElement.style.display = 'flex';
    
    if (!creature.image) {
        placeholderElement.innerHTML = `
            <p>이미지 없음</p>
            <small>이 생물의 이미지가 준비되지 않았습니다</small>
        `;
        return;
    }
    
    if (creature.isVideo) {
        // 비디오 로드
        console.log('비디오 로드:', creature.image);
        const videoSource = videoElement.querySelector('source');
        videoSource.src = creature.image;
        videoElement.load();
        
        videoElement.onloadeddata = function() {
            console.log('비디오 로드 완료');
            placeholderElement.style.display = 'none';
            videoElement.style.display = 'block';
        };
        
        videoElement.onerror = function() {
            console.error('비디오 로드 실패:', creature.image);
            placeholderElement.innerHTML = `
                <p>비디오 로드 실패</p>
                <small>비디오를 불러올 수 없습니다</small>
            `;
        };
    } else {
        // 이미지 로드
        console.log('이미지 로드:', creature.image);
        imageElement.onload = function() {
            console.log('이미지 로드 완료');
            placeholderElement.style.display = 'none';
            imageElement.style.display = 'block';
        };
        
        imageElement.onerror = function() {
            console.error('이미지 로드 실패:', creature.image);
            placeholderElement.innerHTML = `
                <p>이미지 로드 실패</p>
                <small>이미지를 불러올 수 없습니다</small>
            `;
        };
        
        imageElement.src = creature.image;
        imageElement.alt = creature.name;
    }
}

// 생물 상세 정보 모달 닫기
function closeCreatureModal() {
    console.log('생물 모달 닫기');
    const modal = document.getElementById('creatureDetailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 배경 스크롤 복원
    }
}

// 모달 외부 클릭 시 닫기
document.addEventListener('DOMContentLoaded', function() {
    const creatureModal = document.getElementById('creatureDetailModal');
    const biomeModal = document.getElementById('biomeDetailModal');
    
    if (creatureModal) {
        creatureModal.addEventListener('click', function(e) {
            if (e.target === creatureModal) {
                closeCreatureModal();
            }
        });
    }
    
    if (biomeModal) {
        biomeModal.addEventListener('click', function(e) {
            if (e.target === biomeModal) {
                closeBiomeModal();
            }
        });
    }
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCreatureModal();
            closeBiomeModal();
        }
    });
});