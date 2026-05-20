/**
 * (주)비에이텍 - 기업 공식 웹사이트 인터랙션 스크립트
 * Author: Professional Front-End Developer
 * Features: 스크롤 감지 GNB 스타일 변경, 모바일 햄버거 메뉴 제어, Scroll Reveal 애니메이션
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. 헤더 스크롤 이벤트 (스크롤 시 투명 GNB -> 반투명 라이트 테마)
    // ----------------------------------------------------
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // 페이지 로딩 시 초기 상태 체크
    handleScroll();
    window.addEventListener('scroll', handleScroll);


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
        const fallbackReveal = () => {
            const windowHeight = window.innerHeight;
            fadeUpElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 50) {
                    el.classList.add('visible');
                }
            });
        };
        
        fallbackReveal();
        window.addEventListener('scroll', fallbackReveal);
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
});
