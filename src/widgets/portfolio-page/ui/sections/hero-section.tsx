"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/shared/lib/motion";
import { useResolvedTheme } from "@/shared/lib/theme/use-resolved-theme";

import darkBtn from "@/shared/assets/ico/darkBtn.svg";
import lightBtn from "@/shared/assets/ico/lightBtn.svg";
import lightBgRound from "@/shared/assets/images/lightBgRound.png";
import lightBgRoundMob from "@/shared/assets/images/lightBgRoundMob.png";
import darkBgRound from "@/shared/assets/images/darkBgRound.png";
import darkBgRoundMob from "@/shared/assets/images/darkBgRoundMob.png";

export function HeroSection() {
  const { isDark, isReady } = useResolvedTheme();
  const buttonAsset = isDark ? darkBtn : lightBtn;
  const bgRoundAsset = isDark ? darkBgRound : lightBgRound;
  const bgRoundMobAsset = isDark ? darkBgRoundMob : lightBgRoundMob;
  const bgRoundUrl =
    typeof bgRoundAsset === "string" ? bgRoundAsset : bgRoundAsset.src;
  const bgRoundMobUrl =
    typeof bgRoundMobAsset === "string" ? bgRoundMobAsset : bgRoundMobAsset.src;
  const buttonBgUrl =
    typeof buttonAsset === "string" ? buttonAsset : buttonAsset.src;


  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 text-foreground">
      {isReady ? (
        <>
          {/* md 이하: 모바일용 배경 */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-no-repeat bg-center md:hidden"
            style={{
              backgroundImage: `url(${bgRoundMobUrl})`,
              backgroundSize: "60% auto",
            }}
            aria-hidden
          />
          {/* md 이상: 데스크탑용 배경 */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 hidden bg-no-repeat bg-center md:block"
            style={{
              backgroundImage: `url(${bgRoundUrl})`,
              backgroundSize: "60% auto",
            }}
            aria-hidden
          />
        </>
      ) : null}
      <div className="mx-auto w-full max-w-4xl text-center">
        <motion.div
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={staggerItem}
            className="mx-auto mb-4 w-fit"
          >
            <h1 className=" max-w-[80%] leading-[110%] text-center mx-auto [text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] font-a2z font-bold text-6xl md:text-8xl sm:text-7xl lg:9xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
              FRONTEND DEVELOPER
            </h1>
          </motion.div>
          <motion.div variants={staggerItem} className="inline-block">
            <p className="text-lg text-primary after:content-['▍'] after:ml-[0.15em] after:opacity-85 after:animate-[cursor-blink_1.1s_step-end_infinite]">
              Turning complex flows into simple interfaces 
            </p>
          </motion.div>
        </motion.div>

        <motion.a
          href="#projects"
          className="mb-10 text-[14px] text-foreground py-6 px-4 "
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={
            isReady
              ? {
                  backgroundImage: `url(${buttonBgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }
              : undefined
          }
        >
          View Projects
        </motion.a>
      </div>
    </section>
  );
}
