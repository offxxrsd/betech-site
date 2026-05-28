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
    // 5. [보유장비] GNB 메뉴 클릭 동적 노출 및 스크롤 연동 (초안전 전역 연동)
    // ----------------------------------------------------
    const equipmentMenuLinks = document.querySelectorAll('a[href="./equipment.html"], a[href="equipment.html"], a[href="#equipment-spec-section"], a[href*="show=equipment"]');
    const equipmentSection = document.getElementById('equipment-spec-section');
    
    // GNB 보유장비 링크 클릭 시 동작 정의
    equipmentMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const currentSection = document.getElementById('equipment-spec-section');
            const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');
            
            if (isMainPage && currentSection) {
                // 메인 페이지에 보유장비 섹션이 실재할 경우: 동적 펼치기 & 부드러운 스크롤
                e.preventDefault();
                currentSection.classList.remove('hidden');
                currentSection.classList.add('active');
                
                // 모바일 햄버거 메뉴가 열려있을 경우 닫기 처리
                if (mobileToggle && mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
                
                setTimeout(() => {
                    currentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
            } else {
                // 서브 페이지 또는 섹션이 존재하지 않는 경우: 쿼리스트링과 함께 메인으로 안내 리다이렉트
                e.preventDefault();
                window.location.href = './index.html?show=equipment';
            }
        });
    });
    
    // 다른 페이지에서 메인 페이지로 유입 시 ?show=equipment 쿼리가 있으면 즉시 펼치고 스크롤 다운
    if (equipmentSection) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('show') === 'equipment') {
            equipmentSection.classList.remove('hidden');
            equipmentSection.classList.add('active');
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    equipmentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // 리소스 로드 후 부드럽게 스크롤링 시작
            });
        }
    }
});
