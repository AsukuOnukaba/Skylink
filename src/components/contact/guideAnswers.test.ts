import { describe, expect, it } from "vitest";
import {
  GUIDE_WELCOME,
  answerGuide,
  guideQuickQuestions,
} from "./guideAnswers";

describe("published-page guide", () => {
  it("keeps the welcome wording and does not pretend to be generative", () => {
    expect(GUIDE_WELCOME).toBe(
      "Hello! Welcome to Skylink. I can help you explore our installation services, service areas and products. What would you like to know?",
    );
    const reply = answerGuide("Are you a generative AI?");
    expect(reply.text).toMatch(/not a live generative model/i);
    expect(reply.text).not.toMatch(/₦|in stock|guaranteed/i);
  });

  it("answers the suggested questions from published service areas and services", () => {
    expect(guideQuickQuestions).toHaveLength(5);

    const lagos = answerGuide(guideQuickQuestions[0]);
    expect(lagos.text).toMatch(/service area/i);
    expect(lagos.text).toMatch(/does not list an office/i);
    expect(lagos.links.some((link) => link.to === "/starlink-installation-lagos")).toBe(
      true,
    );

    const home = answerGuide(guideQuickQuestions[1]);
    expect(home.links.some((link) => link.to === "/services/residential-installation")).toBe(
      true,
    );

    const business = answerGuide(guideQuickQuestions[2]);
    expect(business.links.some((link) => link.to === "/services/business-connectivity")).toBe(
      true,
    );

    const maritime = answerGuide(guideQuickQuestions[3]);
    expect(maritime.links.some((link) => link.to === "/services/maritime-offshore")).toBe(
      true,
    );

    const quote = answerGuide(guideQuickQuestions[4]);
    expect(quote.text).not.toMatch(/₦\s?\d/);
    expect(quote.links.some((link) => link.to === "/contact?intent=quote")).toBe(true);
  });
});
