import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Spring Security 정적 리소스(이미지, CSS, JS) 허용 설정 파일
 * 자바 프로젝트 내의 Security 설정 클래스에 덮어씌우거나 교체하여 사용하십시오.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        // Spring Security 필터 체인을 완전히 우회(Ignore)하도록 지정 (이미지 404 및 403 오류 완벽 방지)
        web.ignoring()
           .antMatchers(
               "/images/**", 
               "/css/**", 
               "/js/**", 
               "/favicon.ico", 
               "/*.png", 
               "/*.jpg", 
               "/*.webp", 
               "/*.pdf"
           );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/**").permitAll() // 메인 및 정적 뷰 페이지 접근 허용
            .anyRequest().authenticated();
    }
}
