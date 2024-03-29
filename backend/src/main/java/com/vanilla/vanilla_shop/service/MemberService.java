package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.config.SecurityUtil;
import com.vanilla.vanilla_shop.dto.DeleteMemberRequestDto;
import com.vanilla.vanilla_shop.dto.MemberRequestDto;
import com.vanilla.vanilla_shop.dto.MemberResponseDto;
import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponseDto getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Transactional
    public MemberResponseDto changeMemberPassword(String exPassword, String newPassword) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));

        if (!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }

        member.setPassword(passwordEncoder.encode((newPassword)));

        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDto changeMemberAddress(String newAddress, String newDetailAddress) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));

        member.setAddress(newAddress, newDetailAddress);

        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public void deleteMemeber(DeleteMemberRequestDto requestDto) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));

        memberRepository.deleteById(member.getId());
    }
}
