import React from "react";
import { MAX_MISTAKES } from "../../../lib/constants";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import BaseModal from "../BaseModal";

function InfoModal() {
  return (
    <BaseModal
      title="Information"
      trigger={<Info className="mr-4 cursor-pointer" />} // Add cursor-pointer for clickable icon
      initiallyOpen={false}
      actionButtonText="Got It!"
    >
      <Tabs defaultValue="how-to-play">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="how-to-play">How To Play</TabsTrigger>
          <TabsTrigger value="about-us">About Us</TabsTrigger>
        </TabsList>
        
        {/* How to Play Content */}
        <TabsContent value="how-to-play">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What's The Goal?</AccordionTrigger>
              <AccordionContent>
                <p>Find groups of items or names that share something in common.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How Do I Play?</AccordionTrigger>
              <AccordionContent>
                <p>Select the items and tap 'Submit' to check if your guess matches one of the answer categories.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How Many Tries Do I Get?</AccordionTrigger>
              <AccordionContent>
                <p>{`You can make ${MAX_MISTAKES} mistakes before the game ends.`}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        {/* About Us Content */}
        <TabsContent value="about-us">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who Are Y'all?</AccordionTrigger>
              <AccordionContent>
                <p>
                  This project is brought to you by andcomputers. Feel free to
                  subscribe to our writing and other experiments.{" "}
                  <a
                    href="https://andcomputers.io/"
                    target="_blank"
                    className="underline font-bold" rel="noreferrer"
                  >
                    Check out our writing here.
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How Can I Support?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-1">If you'd like to support, feel free!</p>
                <ul className="list-disc pl-5">
                  <li>
                    Help us make an upcoming puzzle by{" "}
                    <a
                      href="mailto:jcp@mail.andcomputers.io"
                      target="_blank"
                      className="underline font-bold" rel="noreferrer"
                    >
                      emailing the team.
                    </a>
                  </li>
                  <li className="mt-2">
                    <p className="mb-1">Help us pay for servers & time:</p>
                    <ul className="list-disc pl-5">
                      <li>
                        One-time contribution via{" "}
                        <a
                          href="https://buy.stripe.com/7sIg1Udac6xZegodQR"
                          target="_blank"
                          className="underline font-bold" rel="noreferrer"
                        >
                          Stripe.
                        </a>
                      </li>
                      <li>
                        Recurring contributions via{" "}
                        <a
                          href="https://www.patreon.com/andcomputers"
                          target="_blank"
                          className="underline font-bold" rel="noreferrer"
                        >
                          Patreon.
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Any Other Projects to Check Out?
              </AccordionTrigger>
              <AccordionContent>
                <p>Just a few! Check them out:</p>
                <ul className="list-disc pl-5">
                  <li>
                    <a
                      href="https://andcomputers.io/"
                      target="_blank"
                      className="underline font-bold" rel="noreferrer"
                    >
                      Our writing and thoughts are here.
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://blacktwitter.io/"
                      target="_blank"
                      className="underline font-bold" rel="noreferrer"
                    >
                      BlackTwitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://blackwords.andcomputers.io/"
                      target="_blank"
                      className="underline font-bold" rel="noreferrer"
                    >
                      Black Wordle
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

export default InfoModal;
