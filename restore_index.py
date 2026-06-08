import os

index_path = "/Users/yoojung/Downloads/웹사이트 만들기/index.html"

with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

# Part 1: Misplaced JS block inside pump spec column
# Let's locate the misplaced script start and the end
misplaced_start = "<!-- ==========================================================================\n         사회공헌(CSR) 3D 플립 북 인터랙션 스크립트"
misplaced_end = "    </script>  <h4>CONTACT INFO</h4>"

# Let's verify if they exist in the file
if misplaced_start in content and misplaced_end in content:
    print("Found misplaced script block in content.")
    
    # We want to replace everything from misplaced_start to misplaced_end with the original spec tables, CTA banner, and footer brand markup:
    replacement_html = """                                    <div class="eq-bullets-box">
                                        <h5>주요 기술적 장점</h5>
                                        <ul>
                                            <li>강도 해석을 필한 베이스 프레임 상에 다수의 대형 원심 펌프를 병렬로 배치하여 최적의 부하 분산 및 교대 운전이 가능합니다.</li>
                                            <li>인버터(VFD) 자동 제어 판넬을 적용하여 공정 유량 수용량 변화에 맞춰 회전 주파수를 스마트하게 자동 가변 제어합니다.</li>
                                            <li>흡입 및 토출 플랜지 조인트에 방진 설계를 채택하여 기계 기동 시 발생하는 파손용 수격(Water Hammering) 압력을 예방합니다.</li>
                                            <li>임펠러의 3D 정밀 컴퓨터 밸런싱을 거쳐 조립하여 가혹한 고압 가동 시에도 캐비테이션(공동 현상) 발생을 억제합니다.</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="eq-apps-box">
                                        <h5>주요 적용 분야 (Applications)</h5>
                                        <p>광역 배수 가압장 및 종합 취수원, 대규모 제철 및 석유화학 플랜트 순환 냉각수 공급 계통, 신도시 수처리 가압 스테이션</p>
                                    </div>
                                </div>
                            </div>
                            <!-- 하단: 기술 사양 표 -->
                            <div class="eq-spec-table-box">
                                <table class="eq-spec-table">
                                    <thead>
                                        <tr>
                                            <th colspan="4">KEY TECHNICAL SPECIFICATION (장비 기술 사양 명세)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>시스템 구성 (Configuration)</th>
                                            <td>2대 ~ 4대 멀티 병렬 가동 및 제어</td>
                                            <th>제어 인터페이스 (Control Method)</th>
                                            <td>인버터 통합형 VFD (Modbus / Profibus 이더넷 판넬)</td>
                                        </tr>
                                        <tr>
                                            <th>합산 최대 유량 (Total Flow)</th>
                                            <td>Max. 3,200 m³/hr</td>
                                            <th>전동기 규격 (Motor Standard)</th>
                                            <td>삼상 고유도 전동기 (IE3 / IE4 프리미엄 모터)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </article>
                    </a>

                </div>
            </div>
        </section>

        <!-- CTA Section (기술 문의 유도) -->
        <section class="cta-banner-section" aria-labelledby="cta-banner-title">
            <div class="section-container text-center">
                <h2 id="cta-banner-title">유체 제어, 최고의 신뢰성을 보장합니다</h2>
                <p>무맥동 정량펌프의 선정부터 도면 설계, 시공 및 철저한 유지관리까지 한 번에 상담받으세요.</p>
                <div class="cta-btns">
                    <a href="tel:033-248-1111" class="btn btn-primary-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        033-248-1111
                    </a>
                    <a href="./inquiry.html" class="btn btn-outline-white">온라인 상담신청</a>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer 영역 (상세 연락처 및 기업 정보) -->
    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-brand">
                <div class="footer-logo">BAETECK</div>
                <div class="footer-company-name">(주)비에이텍</div>
                <p class="footer-slogan">수처리 공정의 안정성과 정밀함을 극대화하는 물 공학 엔지니어링 파트너</p>
            </div>
            
            <div class="footer-info">
                <h4>CONTACT INFO</h4>"""

    # Do the replacement of the misplaced block
    start_idx = content.find(misplaced_start)
    end_idx = content.find(misplaced_end) + len(misplaced_end)
    
    # We want to keep <h4>CONTACT INFO</h4> from end_idx but remove it from end of replacement
    content = content[:start_idx] + replacement_html + content[content.find(misplaced_end) + len("    </script> ") :]
    print("Replaced misplaced block.")
else:
    print("Could not find misplaced block. Let's check why.")

# Part 2: Replace the old GSAP script at the bottom of the file with the new 3D book flip script
gsap_start = "<!-- ==========================================================================\n         GSAP & ScrollTrigger 사회공헌(CSR) 애니메이션 스크립트"
gsap_end = "    </script>"

# Find occurrences of GSAP script block
if gsap_start in content:
    start_idx = content.find(gsap_start)
    # find the next </script> after start_idx
    script_end_tag = "</script>"
    end_idx = content.find(script_end_tag, start_idx) + len(script_end_tag)
    
    new_script = """<!-- ==========================================================================
         사회공헌(CSR) 3D 플립 북 인터랙션 스크립트
         ========================================================================== -->
    <script>
        window.addEventListener('load', () => {
            // State variables
            let currentStep = 1;
            const totalSteps = 5;

            // Pages mapping (matched with page IDs in markup)
            const pages = [
                document.getElementById('csr-page1'),
                document.getElementById('csr-page2'),
                document.getElementById('csr-page3')
            ];

            // Content regions for active highlighting
            const stepContents = {
                1: document.getElementById('content-step1'),
                2: document.getElementById('content-step2'),
                3: document.getElementById('content-step3'),
                4: document.getElementById('content-step4'),
                5: document.getElementById('content-step5')
            };

            // Navigation elements
            const btnPrev = document.getElementById('csr-btn-prev');
            const btnNext = document.getElementById('csr-btn-next');
            const indicator = document.getElementById('csr-page-indicator');
            const waterStream = document.getElementById('csr-water-stream');

            function updateBookState() {
                // 1. Rotation and active flags
                if (currentStep === 1) {
                    pages[0].classList.remove('flipped');
                    pages[1].classList.remove('flipped');
                    pages[2].classList.remove('flipped');
                } else if (currentStep === 2 || currentStep === 3) {
                    pages[0].classList.add('flipped');
                    pages[1].classList.remove('flipped');
                    pages[2].classList.remove('flipped');
                } else if (currentStep === 4 || currentStep === 5) {
                    pages[0].classList.add('flipped');
                    pages[1].classList.add('flipped');
                    pages[2].classList.remove('flipped');
                }

                // 2. Adjust z-indexes for smooth overlapping
                pages.forEach((page, index) => {
                    if (page) {
                        const isFlipped = page.classList.contains('flipped');
                        if (isFlipped) {
                            page.style.zIndex = index + 1; // Flipped page index
                        } else {
                            page.style.zIndex = pages.length - index; // Unflipped page index
                        }
                    }
                });

                // 3. Highlight current step content border
                Object.keys(stepContents).forEach(step => {
                    const el = stepContents[step];
                    if (el) {
                        if (parseInt(step) === currentStep) {
                            el.classList.add('page-content-active');
                        } else {
                            el.classList.remove('page-content-active');
                        }
                    }
                });

                // 4. Update Navigation Controls
                if (indicator) {
                    indicator.textContent = `${currentStep} / ${totalSteps}`;
                }

                // 5. Update Water Stream Progress (0% to 100%)
                if (waterStream) {
                    const progress = (currentStep - 1) / (totalSteps - 1);
                    waterStream.style.height = `${progress * 100}%`;
                }

                // Disabled state on prev button
                if (btnPrev) {
                    if (currentStep === 1) {
                        btnPrev.classList.add('opacity-40', 'cursor-not-allowed');
                        btnPrev.style.pointerEvents = 'none';
                    } else {
                        btnPrev.classList.remove('opacity-40', 'cursor-not-allowed');
                        btnPrev.style.pointerEvents = 'auto';
                    }
                }

                // Next button morphs to scroll trigger on last page
                if (btnNext) {
                    if (currentStep === totalSteps) {
                        btnNext.innerHTML = '📥';
                        btnNext.setAttribute('aria-label', '완료 및 다음 섹션으로 이동');
                        btnNext.classList.add('border-cyan-400', 'text-cyan-400', 'shadow-[0_0_12px_rgba(0,240,255,0.4)]');
                    } else {
                        btnNext.innerHTML = '❯';
                        btnNext.setAttribute('aria-label', '다음 페이지');
                        btnNext.classList.remove('border-cyan-400', 'text-cyan-400', 'shadow-[0_0_12px_rgba(0,240,255,0.4)]');
                    }
                }
            }

            function nextStep() {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateBookState();
                } else {
                    // Step 5 도달 후 클릭 시 다음 섹션으로 부드럽게 이동
                    const nextSection = document.querySelector('#blueprint-archive-section');
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }

            function prevStep() {
                if (currentStep > 1) {
                    currentStep--;
                    updateBookState();
                }
            }

            // Click action on page faces to flip to next page
            document.querySelectorAll('.csr-page-face').forEach(face => {
                face.addEventListener('click', (e) => {
                    // Prevent trigger if they click links or buttons inside the page
                    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                    nextStep();
                });
            });

            // Prevent scroll gesture propagation (blocking trackpad/wheel errors)
            const viewport = document.querySelector('.csr-book-viewport');
            if (viewport) {
                viewport.addEventListener('wheel', (e) => {
                    e.preventDefault();
                }, { passive: false });
                
                viewport.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                }, { passive: false });
            }

            // Bind buttons
            if (btnPrev) btnPrev.addEventListener('click', prevStep);
            if (btnNext) btnNext.addEventListener('click', nextStep);

            // Initial trigger
            updateBookState();
        });

        // Helper function for scroll trigger inside the closing page
        function scrollToBlueprint(event) {
            event.preventDefault();
            const nextSection = document.querySelector('#blueprint-archive-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    </script>"""
    
    content = content[:start_idx] + new_script + content[end_idx:]
    print("Replaced GSAP block with new book flip script.")
else:
    print("Could not find GSAP script block in content.")

with open(index_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Finished recovery.")
