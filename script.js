/**
 * (주)비에이텍 - 기업 공식 웹사이트 인터랙션 스크립트
 * Author: Professional Front-End Developer
 * Features: 스크롤 감지 GNB 스타일 변경, 모바일 햄버거 메뉴 제어, Scroll Reveal 애니메이션, [보유장비] 인터랙션
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. 헤더 스크롤 이벤트 (스크롤 시 투명 GNB -> 반투명 라이트 테마)
    // ----------------------------------------------------
    const header = document.getElementById('header');
    
    // requestAnimationFrame 스로틀링을 위한 플래그
    let scrollTicking = false;
    
    const handleScroll = () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    };
    
    // 페이지 로딩 시 초기 상태 체크
    handleScroll();
    // 성능 최적화: passive: true 옵션을 주어 렌더링 지연 방지
    window.addEventListener('scroll', handleScroll, { passive: true });


    // ----------------------------------------------------
    // 2. 모바일 메뉴 토글 제어 (햄버거 메뉴)
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            
            // 클래스 토글
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // 접근성 속성 갱신
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            
            // 모바일 메뉴 열렸을 때 본문 스크롤 막기
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // 모바일 메뉴 링크 클릭 시 드롭다운 닫기
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }


    // ----------------------------------------------------
    // 3. Scroll Reveal (스크롤 시 섹션 페이드업 애니메이션)
    // ----------------------------------------------------
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    if ('IntersectionObserver' in window) {
        // 최신 브라우저를 위한 IntersectionObserver 설정
        const observerOptions = {
            root: null, // 뷰포트를 기준으로 감지
            rootMargin: '0px 0px -80px 0px', // 요소가 화면 하단에서 80px 들어왔을 때 감지
            threshold: 0.15 // 요소의 15%가 화면에 보일 때 감지
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // 한 번 보이면 관찰 중단
                }
            });
        }, observerOptions);
        
        fadeUpElements.forEach(el => observer.observe(el));
        
    } else {
        // 구형 브라우저를 위한 Fallback (스크롤 위치 수동 계산)
        // requestAnimationFrame 스로틀링 적용하여 레이아웃 스래싱 최소화
        let fallbackTicking = false;
        
        const fallbackReveal = () => {
            if (!fallbackTicking) {
                window.requestAnimationFrame(() => {
                    const windowHeight = window.innerHeight;
                    fadeUpElements.forEach(el => {
                        const elementTop = el.getBoundingClientRect().top;
                        if (elementTop < windowHeight - 50) {
                            el.classList.add('visible');
                        }
                    });
                    fallbackTicking = false;
                });
                fallbackTicking = true;
            }
        };
        
        fallbackReveal();
        window.addEventListener('scroll', fallbackReveal, { passive: true });
    }


    // ----------------------------------------------------
    // 4. Hero Section 페이드인 컴포넌트 동작
    // ----------------------------------------------------
    const heroElements = document.querySelectorAll('.hero-content .fade-in');
    heroElements.forEach((el, index) => {
        // 순차적인 딜레이를 주어 미려하게 페이드인
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 150 * (index + 1));
    });


    // ----------------------------------------------------
    // 5. [보유장비] 하위 호환성용 쿼리스트링 및 해시 감지 자동 펼침
    // ----------------------------------------------------
    const equipmentSection = document.getElementById('equipment-spec-section');
    if (equipmentSection) {
        const checkEquipmentTrigger = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const isQueryTrigger = urlParams.get('show') === 'equipment';
            const isHashTrigger = window.location.hash === '#equipment-spec-section';
            
            if (isQueryTrigger || isHashTrigger) {
                equipmentSection.classList.remove('hidden');
                equipmentSection.classList.add('active');
                
                setTimeout(() => {
                    equipmentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        };

        // 로드 및 해시 변경 시 트리거 검사
        window.addEventListener('load', checkEquipmentTrigger);
        window.addEventListener('hashchange', checkEquipmentTrigger);
        
        // GNB 보유장비 링크 클릭 시 즉각 감지 (동일 페이지 내부 이동 처리)
        document.querySelectorAll('a[href*="#equipment-spec-section"]').forEach(link => {
            link.addEventListener('click', () => {
                equipmentSection.classList.remove('hidden');
                equipmentSection.classList.add('active');
                setTimeout(() => {
                    equipmentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            });
        });
    }

    // ----------------------------------------------------
    // 6. AnimatePresence 시뮬레이션 기반 전역 페이지 트랜지션 엔진
    // ----------------------------------------------------
    // 브라우저 렌더링 완료 즉시 페이드인(Enter) 주입
    document.body.classList.add('page-loaded');

    // 페이지 이탈(Exit) 시 페이드아웃 적용을 위한 통합 클릭 위임
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        const target = anchor.getAttribute('target');

        // 외부 링크, 메일, 전화, 해시 링크, 새 창, 딥링크, 특수키 클릭은 예외 분기
        if (
            !href ||
            href.startsWith('#') ||
            href.startsWith('tel:') ||
            href.startsWith('mailto:') ||
            href.startsWith('javascript:') ||
            href.startsWith('kakaomap:') ||
            target === '_blank' ||
            href.includes('//') ||
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey
        ) {
            return;
        }

            // 로컬 HTML 페이지간 이동 감지 시 AnimatePresence Exit 효과 구동
            if (href.includes('.html') || href.startsWith('./') || href.startsWith('../')) {
                e.preventDefault();
                
                // exiting 클래스를 부여해 즉각적인 페이드아웃 개시
                document.body.classList.add('page-exiting');

                // 0.35초 후 자연스러운 교체가 일어나도록 리다이렉트
                setTimeout(() => {
                    window.location.href = href;
                }, 350);
            }
    }, { passive: false });

    // ----------------------------------------------------
    // 7. 자바 백엔드 배포 환경용 Context Path 자동 맵핑 및 캐시 버스팅 (Cache Busting)
    // ----------------------------------------------------
    function getContextPath() {
        const host = window.location.host;
        const path = window.location.pathname;
        if (path.indexOf('/') === -1 || host === "") return "";
        const context = path.substring(0, path.indexOf('/', 1));
        // HTML 파일명이 첫 세그먼트이거나 빈값인 경우 예외처리
        if (context === "/index.html" || context.endsWith(".html") || context === "/WEB-INF") return "";
        return context;
    }

    const cp = getContextPath();
    const timestamp = new Date().getTime();

    // 모든 이미지 요소의 경로를 Context Path에 맞춰 보정하고 캐시 버스팅 파라미터 추가
    document.querySelectorAll('img').forEach(img => {
        let originalSrc = img.getAttribute('src');
        if (originalSrc && !originalSrc.startsWith('data:') && !originalSrc.startsWith('http') && !originalSrc.startsWith('//')) {
            let targetSrc = originalSrc;
            if (targetSrc.startsWith('./')) {
                targetSrc = targetSrc.substring(2);
            }
            
            // Context Path 접두사 추가
            if (cp && !targetSrc.startsWith(cp + '/')) {
                targetSrc = cp + '/' + targetSrc;
            } else if (!targetSrc.startsWith('/')) {
                targetSrc = './' + targetSrc;
            }
            
            // 캐시 버스팅 파라미터 추가
            const separator = targetSrc.includes('?') ? '&' : '?';
            img.src = `${targetSrc}${separator}v=${timestamp}`;
        }
    });

    // 비디오 poster 처리
    document.querySelectorAll('video').forEach(video => {
        let poster = video.getAttribute('poster');
        if (poster && !poster.startsWith('data:') && !poster.startsWith('http') && !poster.startsWith('//')) {
            let targetPoster = poster.startsWith('./') ? poster.substring(2) : poster;
            if (cp && !targetPoster.startsWith(cp + '/')) {
                targetPoster = cp + '/' + targetPoster;
            } else if (!targetPoster.startsWith('/')) {
                targetPoster = './' + targetPoster;
            }
            const separator = targetPoster.includes('?') ? '&' : '?';
            video.setAttribute('poster', `${targetPoster}${separator}v=${timestamp}`);
        }
    });
});
